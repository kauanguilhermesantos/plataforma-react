import { getTokenFromHeader, verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { join } from "path";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

// GET - Buscar dados do usuário logado
export async function GET(request: NextRequest) {
    try {

        console.log("Recebida a requisição para api/usuario/perfil");

        const token = getTokenFromHeader(request.headers.get("Authorization"));

        console.log("Token do header:", token ? "Presente" : "Ausente");

        if (!token) {

            console.log("Token não fornecido");

            return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
        }

        const decoded = verifyToken(token);

        console.log("Token decodificado:", decoded);

        if (!decoded) {
            return NextResponse.json({ error: "Token inválido" }, { status: 401 });
        }

        console.log("Buscando dados do usuário com ID:", decoded.usuarioId);

        const usuario = await prisma.usuario.findUnique({
            where: { id_usuario: parseInt(decoded.usuarioId) },
            select: {
                id_usuario: true,
                nome: true,
                sobrenome: true,
                email: true,
                telefone: true,
                // bio: true,
                localizacao: true,
                data_nascimento: true,
                foto: true,
                // join_date: true,
                // estilo_apredizagem: true,
                // estilo_apredizagem_scores: true,
            },
        });

        console.log("Dados do usuário encontrados:", usuario);

        if (!usuario) {

            console.log("Usuário não encontrado");

            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        const usuarioData = {
            id: usuario.id_usuario,
            primeiroNome: usuario.nome,
            ultimoNome: usuario.sobrenome,
            email: usuario.email,
            telefone: usuario.telefone,
            // bio: usuario.bio,
            localizacao: usuario.localizacao,
            dataNascimento: usuario.data_nascimento ? usuario.data_nascimento.toISOString().split('T')[0] : '',
            avatar: usuario.foto,
            // joinDate: usuario.join_date ? usuario.join_date.toISOString().split('T')[0] : '',
            // estiloApredizagem: usuario.estilo_apredizagem,
            // estiloApredizagemScores: usuario.estilo_apredizagem_scores ? JSON.parse(usuario.estilo_apredizagem_scores) : undefined,
        };

        console.log("Dados do usuário formatados:", usuarioData);

        return NextResponse.json(usuarioData);
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }    
}

// PUT - Atualizar dados do usuário logado
export async function PUT(request: NextRequest) {
    try {
        // Extrair e verificar o token JWT
        const token = getTokenFromHeader(request.headers.get("Authorization"));

        // Verificar se o token está presente
        if (!token) {
            return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
        }

        // Verificar e decodificar o token
        const decoded = verifyToken(token);
        // Verificar se o token decodificado é válido
        if (!decoded) {
            return NextResponse.json({ error: "Token inválido" }, { status: 401 });
        }

        // Extrair os dados do corpo da requisição
        const body = await request.json();

        // Atualizar os dados do usuário no banco de dados
        const atualizado = await prisma.usuario.update({
            where: { id_usuario: parseInt(decoded.usuarioId) },
            data: {
                nome: body.primeiroNome,
                sobrenome: body.ultimoNome,
                telefone: body.telefone,
                localizacao: body.localizacao,
                data_nascimento: body.dataNascimento ? new Date(body.dataNascimento) : null,
                foto: body.avatar
            },
        });
        // Retornar uma resposta de sucesso
        return NextResponse.json({ message: "Perfil atualizado com sucesso" });
    } catch (error) {
        // Tratar erros e retornar uma resposta de erro
        console.error("Erro ao atualizar dados do usuário:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

// POST - Upload de avatar do usuário logado
export async function POST(request: NextRequest) {
    try {

        console.log('🔐 Recebida requisição para upload de avatar')

        // Extrair e verificar o token JWT
        const token = getTokenFromHeader(request.headers.get("Authorization"));

        // Verificar se o token está presente
        if (!token) {

            console.log('❌ Token não fornecido')

            return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
        }

        // Verificar e decodificar o token
        const decoded = verifyToken(token);

        // Verificar se o token decodificado é válido
        if (!decoded) {

            console.log('❌ Token inválido')

            return NextResponse.json({ error: "Token inválido" }, { status: 401 });
        }

        console.log('👤 Usuário autenticado:', decoded.usuarioId)

        const formData = await request.formData();
        const file = formData.get("avatar") as File;

        console.log('📁 Arquivo recebido:', file ? {
            name: file.name,
            type: file.type,
            size: file.size
        } : 'Nenhum arquivo')

        if (!file) {
            
            console.log('❌ Nenhum arquivo enviado')

            return NextResponse.json({ message: "Nenhum arquivo encontrado"}, { status: 400 })
        }

        // Validar tipo do arquivo
        const tiposValidos = ["image/jpeg", "image/png"];
        if (!tiposValidos.includes(file.type)) {

            console.log('❌ Tipo de arquivo inválido:', file.type)

            return NextResponse.json({ message: "Tipo de arquivo não suportado. Use JPG ou PNG." }, { status: 400 })
        }

        // Validar tamanho (10MB)
        if (file.size > 10 * 1024 *1024) {

            console.log('❌ Arquivo muito grande:', file.size)

            return NextResponse.json({ message: "Arquivo muito grande. Máximo 10MB." }, { status: 400 })
        }

        // Converter File para Buffer
        const bytes = await file.arrayBuffer()
        const buffer = await Buffer.from(bytes)

        // Criar nome único para o arquivo
        const timestamp = Date.now()
        const fileExtension = file.type.split("/")[1]
        const fileName = `avatar-${decoded.usuarioId}-${timestamp}.${fileExtension}`
        
        // Definir caminha para salvar (public/avatars)
        const uploadDir = join(process.cwd(), "public", "avatars")

        console.log('📂 Diretório de upload:', uploadDir)

        // Criar diretório se não existir
    if (!existsSync(uploadDir)) {

        console.log('📁 Criando diretório...')

      await mkdir(uploadDir, { recursive: true })
    }

    const filePath = join(uploadDir, fileName)

    console.log('💾 Salvando arquivo em:', filePath)
    
    // Salvar arquivo
    await writeFile(filePath, buffer)

    // URL para acessar a imagem
    const avatarUrl = `/avatars/${fileName}`

    console.log('👤 Atualizando avatar no banco para:', avatarUrl)

    // Atualizar no banco de dados
    await prisma.usuario.update({
        where: { id_usuario: parseInt(decoded.usuarioId)},
        data: { foto: avatarUrl}
    })

    console.log('✅ Avatar atualizado com sucesso')

    return NextResponse.json({
        sucess: true,
        avatarUrl,
        message: "Avatar atualizado com sucesso"
    })

    } catch (error) {
        console.error("Erro no upload do avatar: ", error)
        return NextResponse.json(
            { message: "Erro interno do servidor"},
            { status: 500 }
        )
    }
}
