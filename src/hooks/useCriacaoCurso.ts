"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CursoFormData, Modulo, Aula, Instrutor } from '@/types/curso';
import { JWTService } from '@/lib/jwt';
import { title } from 'process';

export const useCriacaoCurso = () => {
  const router = useRouter();
  const [currentTag, setCurrentTag] = useState('');
  const [thumbnailUploading, setThumbnailUploading] = useState(false); // Estado para upload de thumbnail
  const [instrutorFotoUploading, setInstrutorFotoUploading] = useState(false);
  const [mostrarDeleteModal, setMostrarDeleteModal] = useState(false);
  const [mostrarEstiloAprendizagemModal, setMostrarEstiloAprendizagemModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Estado inicial do formulário
  const [formData, setFormData] = useState<CursoFormData>({
    titulo: '',
    descricao: '',
    categoria: 'Programação',
    nivel: 'Iniciante',
    estiloAprendizagem: 'Pragmático',
    status: 'Rascunho',
    thumbnail: null,
    thumbnailPreview: null,
    tags: [],
    instrutor: {
      id: 0,
      nome: '',
      bio: '',
      foto: null,
    },
    modulos: []
  });

  // Função para obter headers com JWT
  const getAuthHeaders = () => {
    const token = JWTService.getToken();
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  // Função de upload genérica
  const uploadFile = async (file: File, tipo: 'thumbnail' | 'instrutor_foto' | 'video_aula'): Promise<string> => {
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipo', tipo);

    try {
      const response = await fetch('/api/admin/curso/uploadArquivos', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro no upload');
      }

      const data = await response.json();
      return data.url;

    } catch (error: any) {
      console.error('Erro no upload do arquivo:', error);
      throw error;
    }
  };

  // Atualizar dados do formulário
  const updateFormData = (field: keyof CursoFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Atualizar dados do instrutor
  const updateInstrutor = (field: keyof Instrutor, value: string) => {
    setFormData(prev => ({
      ...prev,
      instrutor: { ...prev.instrutor, [field]: value }
    }));
  };

  // Upload de thumbnail
  const handleThumbnailUpload = async (file: File) => {
    setThumbnailUploading(true);
    
    try {
      const fileUrl = await uploadFile(file, 'thumbnail');
      const previewUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({ 
        ...prev, 
        thumbnail: fileUrl,
        thumbnailPreview: previewUrl 
      }));
    } catch (error: any) {
      console.error('Erro no upload da thumbnail:', error);
      alert(error.message || 'Erro ao fazer upload da thumbnail');
    } finally {
      setThumbnailUploading(false);
    }
  };

  const removeThumbnail = () => {
    // Liberar a URL do objeto para evitar vazamentos de memória
    if (formData.thumbnailPreview) {
      URL.revokeObjectURL(formData.thumbnailPreview);
    }
    
    setFormData(prev => ({ 
      ...prev, 
      thumbnail: null,
      thumbnailPreview: null 
    }));
  };

  // Upload de foto do instrutor
  const handleInstrutorFotoUpload = async (file: File) => {
    setInstrutorFotoUploading(true);
    try {
      const fileUrl = await uploadFile(file, 'instrutor_foto');
      const previewUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        instrutor: { 
          ...prev.instrutor, 
          foto: fileUrl,
          fotoPreview: previewUrl 
        }
      }));
    } catch (error: any) {
      console.error('Erro no upload da foto:', error);
      alert(error.message || 'Erro ao fazer upload da foto');
    } finally {
      setInstrutorFotoUploading(false);
    }
  };

  // Remover foto do instrutor
  const removeInstrutorFoto = () => {
    setFormData(prev => ({
      ...prev,
      instrutor: { 
        ...prev.instrutor, 
        foto: null,
        fotoPreview: undefined 
      }
    }));
  };

  // Adicionar tag 
  const addTag = () => {
    const tag = currentTag.trim();
    
    if (tag && !formData.tags?.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag],
      }));
      setCurrentTag(''); // Limpar o input após adicionar
    }
  };

  // Remover tag
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove || []),
    }));
  };

  // Captura a tecla Enter para adicionar tag
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevenir submit do formulário
      addTag();
    }
  };

  // Adicionar módulo
  const addModulo = () => {
    const novoModulo: Modulo = {
      id: Date.now(),
      titulo: `Módulo ${formData.modulos.length + 1}`,
      descricao: '',
      ordem: formData.modulos.length + 1,
      aulas: []
    };
    setFormData(prev => ({ ...prev, modulos: [...prev.modulos, novoModulo] }));
  };

  // Atualizar módulo
  const updateModulo = (moduloId: number, field: keyof Modulo, value: string) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo => 
        modulo.id === moduloId ? { ...modulo, [field]: value } : modulo
      )
    }));
  };

  // Atualizar descrição do módulo
  const updateModuloDescricao = (moduloId: number, descricao: string) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo => 
        modulo.id === moduloId ? { ...modulo, descricao } : modulo
      )
    }));
  };

  // Reordenar módulos
  const reordenarModulos = (startIndex: number, endIndex: number) => {
    setFormData(prev => {
      const modulos = [...prev.modulos];
      const [removed] = modulos.splice(startIndex, 1);
      modulos.splice(endIndex, 0, removed);
      
      // Atualizar ordens
      return {
        ...prev,
        modulos: modulos.map((modulo, index) => ({
          ...modulo,
          ordem: index + 1
        }))
      };
    });
  };
  
  // Remover módulo
  const removeModulo = (moduloId: number) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.filter(modulo => modulo.id !== moduloId)
    }));
  };

  // Adicionar aula
  const addAula = (moduloId: number) => {
    const modulo = formData.modulos.find(m => m.id === moduloId);
    if (!modulo) return;

    const novaAula: Aula = {
      id: Date.now(),
      titulo: `Aula ${modulo.aulas.length + 1}`,
      descricao: '',
      videoUrl: null,
      duracao: 0,
      ordem: modulo.aulas.length + 1
    };

    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo =>
        modulo.id === moduloId 
          ? { ...modulo, aulas: [...modulo.aulas, novaAula] } 
          : modulo
      )
    }));
  };

  // Atualizar aula
  const updateAula = (moduloId: number, aulaId: number, field: keyof Aula, value: any) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo =>
        modulo.id === moduloId
          ? {
              ...modulo,
              aulas: modulo.aulas.map(aula =>
                aula.id === aulaId ? { ...aula, [field]: value } : aula
              ),
            }
          : modulo
      )
    }));
  };

  // Reordenar aulas dentro de um módulo
  const reordenarAulas = (moduloId: number, startIndex: number, endIndex: number) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo => {
        if (modulo.id !== moduloId) return modulo;
        
        const aulas = [...modulo.aulas];
        const [removed] = aulas.splice(startIndex, 1);
        aulas.splice(endIndex, 0, removed);
        
        return {
          ...modulo,
          aulas: aulas.map((aula, index) => ({
            ...aula,
            ordem: index + 1
          }))
        };
      })
    }));
  };

  // Remover aula
  const removeAula = (moduloId: number, aulaId: number) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo =>
        modulo.id === moduloId
          ? { ...modulo, aulas: modulo.aulas.filter(aula => aula.id !== aulaId) }
          : modulo
      )
    }));
  };

  // // Upload de vídeo
  const handleVideoUpload = async (moduloId: number, aulaId: number, file: File) => {
    try {
      updateAula(moduloId, aulaId, 'isUploading', true);
      
      const fileUrl = await uploadFile(file, 'video_aula');
      const previewUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        modulos: prev.modulos.map(modulo =>
          modulo.id === moduloId
            ? {
                ...modulo,
                aulas: modulo.aulas.map(aula =>
                  aula.id === aulaId
                    ? {
                        ...aula,
                        video_url: fileUrl,
                        videoUrl: fileUrl,
                        arquivo: fileUrl,
                        videoPreview: previewUrl,
                        videoArquivo: file.name,
                        isUploading: false,
                      }
                    : aula
                ),
              }
            : modulo
        )
      }));
    } catch (error: any) {
      console.error('Erro no upload do vídeo:', error);
      updateAula(moduloId, aulaId, 'isUploading', false);
      alert(error.message || 'Erro ao fazer upload do vídeo');
    }
  };

  // Remover vídeo
  const removeVideo = (moduloId: number, aulaId: number) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo =>
        modulo.id === moduloId
          ? {
              ...modulo,
              aulas: modulo.aulas.map(aula =>
                aula.id === aulaId
                  ? {
                      ...aula,
                      video_url: null,
                      videoPreview: undefined,
                    }
                  : aula
              ),
            }
          : modulo
      )
    }));
  };

  // Submit do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosParaEnvio = { 
      titulo: formData.titulo,
      descricao: formData.descricao,
      categoria: formData.categoria,
      nivel: formData.nivel,
      estiloAprendizagem: formData.estiloAprendizagem,
      status: formData.status,
      thumbnail: formData.thumbnail,
      tags: formData.tags || [],
      instrutor: {
        id: formData.instrutor.id,
        nome: formData.instrutor.nome,
        bio: formData.instrutor.bio,
        foto: formData.instrutor.foto,
      },
      modulos: formData.modulos.map(modulo => ({
        titulo: modulo.titulo,
        descricao: modulo.descricao,
        ordem: modulo.ordem,
        status: modulo.status,
        aulas: modulo.aulas.map(aula => ({
          titulo: aula.titulo,
          descricao: aula.descricao,
          duracao: aula.duracao,
          ordem: aula.ordem,
          arquivo: aula.videoUrl || null ,
          status: aula.status || 'Rascunho',
        })),
      })),
     };

    // DEBUG: Verificar os dados antes de enviar
    console.log('Dados do formulário:', formData);
    console.log('Campos obrigatórios:', {
      titulo: formData.titulo,
      descricao: formData.descricao,
      categoria: formData.categoria,
      nivel: formData.nivel,
      instrutor: formData.instrutor,
      estiloAprendizagem: formData.estiloAprendizagem
    });

    // DEBUG: Verificar dados do modulo e aula
    console.log('📤 Dados enviados para API:', dadosParaEnvio);
    console.log('🎬 URLs de vídeo nas aulas:', 
      dadosParaEnvio.modulos.flatMap(modulo => 
        modulo.aulas.map(aula => ({
          titulo: aula.titulo,
          arquivo: aula.arquivo // Campo que será salvo no banco
        }))
      )
    );
    
    // Validações básicas
    if (!formData.titulo || !formData.descricao || !formData.categoria || !formData.nivel || !formData.estiloAprendizagem) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!formData.instrutor.nome) {
      alert('Por favor, preencha os dados do instrutor');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/curso/criacaoCurso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(dadosParaEnvio)
      });

      if (response.ok) {
        const cursoCriado = await response.json();
        console.log('Curso criado com sucesso:', cursoCriado);
        alert('Curso criado com sucesso!');
        router.push('/admin/cursos');
      } else {
        const error = await response.json();
        alert(`Erro ao criar curso: ${error.error}`);
      }
    } catch (error: any) {
      console.error('Erro:', error);
      alert('Erro ao criar curso');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Tem certeza que deseja cancelar? Todas as alterações serão perdidas.')) {
      router.push('/admin/cursos');
    }
  };

  const confirmDeleteCurso = () => {
    setMostrarDeleteModal(false);
    router.push('/admin/cursos');
  };

  return {
    formData,
    currentTag,
    thumbnailUploading,
    instrutorFotoUploading,
    mostrarDeleteModal,
    mostrarEstiloAprendizagemModal,
    submitting,
    setCurrentTag,
    setMostrarDeleteModal,
    setMostrarEstiloAprendizagemModal,
    updateFormData,
    updateInstrutor,
    handleThumbnailUpload,
    removeThumbnail,
    handleInstrutorFotoUpload,
    removeInstrutorFoto,
    addTag,
    removeTag,
    handleTagKeyPress,
    addModulo,
    updateModulo,
    removeModulo,
    addAula,
    updateAula,
    removeAula,
    handleVideoUpload,
    removeVideo,
    handleSubmit,
    handleCancel,
    confirmDeleteCurso,
  };
};