import { getTokenFromHeader, verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

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
                // avatar: true,
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
            // avatar: usuario.avatar,
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

    // PUT - Atualizar dados do usuário logado

}