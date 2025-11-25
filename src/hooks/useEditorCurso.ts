import { useState, useEffect } from 'react';
import { Curso, Modulo, Aula, Recurso, CursoStatus } from '@/types/curso';

interface UseEditorCursoReturn {
  curso: Curso | null;
  loading: boolean;
  saving: boolean;
  aulasExpandida: Set<string>;
  setAulasExpandida: React.Dispatch<React.SetStateAction<Set<string>>>;
  novaTag: string;
  setNovaTag: React.Dispatch<React.SetStateAction<string>>;
  arquivoThumbnail: File | null;
  setArquivoThumbnail: React.Dispatch<React.SetStateAction<File | null>>;
  thumbnailPreview: string;
  setThumbnailPreview: React.Dispatch<React.SetStateAction<string>>;
  thumbnailUploading: boolean;
  setThumbnailUploading: React.Dispatch<React.SetStateAction<boolean>>;
  arquivoFotoInstrutor: File | null;
  setArquivoFotoInstrutor: React.Dispatch<React.SetStateAction<File | null>>;
  fotoInstrutorPreview: string;
  setFotoInstrutorPreview: React.Dispatch<React.SetStateAction<string>>;
  fotoInstrutorUploading: boolean;
  setFotoInstrutorUploading: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarDeleteModuloModal: boolean;
  setMostrarDeleteModuloModal: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarDeleteAulaModal: boolean;
  setMostrarDeleteAulaModal: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarPublicarModal: boolean;
  setMostrarPublicarModal: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarDeleteCursoModal: boolean;
  setMostrarDeleteCursoModal: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarEstiloAprendizagemModal: boolean;
  setMostrarEstiloAprendizagemModal: React.Dispatch<React.SetStateAction<boolean>>;
  moduloToDelete: string | null;
  setModuloToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  aulaToDelete: { moduloId: string; aulaId: string } | null;
  setAulaToDelete: React.Dispatch<React.SetStateAction<{ moduloId: string; aulaId: string } | null>>;
  salvarCurso: (dadosCurso?: Curso) => Promise<void>;
  updateCurso: (updates: Partial<Curso>) => void;
  updateModulo: (moduloId: string, updates: Partial<Modulo>) => void;
  updateAula: (moduloId: string, aulaId: string, updates: Partial<Aula>) => void;
  updateRecurso: (recursoId: string, updates: Partial<Recurso>) => void;
  addModulo: () => void;
  addAula: (moduloId: string) => void;
  addRecurso: () => void;
  deleteModulo: (moduloId: string) => void;
  confirmDeleteModulo: () => void;
  deleteAula: (moduloId: string, aulaId: string) => void;
  confirmDeleteAula: () => void;
  removeRecurso: (recursoId: string) => void;
  toggleExpansaoAula: (aulaId: string) => void;
  handleThumbnailUpload: (file: File) => Promise<void>;
  removeThumbnail: () => void;
  handleFotoInstrutorUpload: (file: File) => Promise<void>;
  removeFotoInstrutor: () => void;
  handleVideoUpload: (moduloId: string, aulaId: string, file: File) => Promise<void>;
  removeVideo: (moduloId: string, aulaId: string) => void;
  addTag: () => void;
  removeTag: (tagToRemove: string) => void;
  handleTagKeyPress: (e: React.KeyboardEvent) => void;
  handlePublishToggle: () => void;
  confirmPublishToggle: () => void;
  confirmDeleteCurso: () => void;
}

export const useEditorCurso = (cursoId?: string): UseEditorCursoReturn => {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aulasExpandida, setAulasExpandida] = useState<Set<string>>(new Set());
  const [novaTag, setNovaTag] = useState('');
  const [arquivoThumbnail, setArquivoThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [arquivoFotoInstrutor, setArquivoFotoInstrutor] = useState<File | null>(null);
  const [fotoInstrutorPreview, setFotoInstrutorPreview] = useState<string>('');
  const [fotoInstrutorUploading, setFotoInstrutorUploading] = useState(false);
  const [mostrarDeleteModuloModal, setMostrarDeleteModuloModal] = useState(false);
  const [mostrarDeleteAulaModal, setMostrarDeleteAulaModal] = useState(false);
  const [mostrarPublicarModal, setMostrarPublicarModal] = useState(false);
  const [mostrarDeleteCursoModal, setMostrarDeleteCursoModal] = useState(false);
  const [mostrarEstiloAprendizagemModal, setMostrarEstiloAprendizagemModal] = useState(false);
  const [moduloToDelete, setModuloToDelete] = useState<string | null>(null);
  const [aulaToDelete, setAulaToDelete] = useState<{ moduloId: string; aulaId: string } | null>(null);

  // Carregar curso se estiver editando
  useEffect(() => {
    if (cursoId) {
      carregarCurso();
    } else {
      // Se for novo curso, inicializar com dados padrão
      setCurso(criarCursoVazio());
      setLoading(false);
    }
  }, [cursoId]);

  const carregarCurso = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/curso/${cursoId}/carregarCurso`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const cursoData = await response.json();
        setCurso(cursoData);
        
        // Configurar previews se existirem
        if (cursoData.thumbnail) {
          setThumbnailPreview(cursoData.thumbnail);
        }
        if (cursoData.instrutor?.avatar) {
          setFotoInstrutorPreview(cursoData.instrutor.avatar);
        }
      } else {
        console.error('Erro ao carregar curso');
      }
    } catch (error) {
      console.error('Erro ao carregar curso:', error);
    } finally {
      setLoading(false);
    }
  };

  const criarCursoVazio = (): Curso => ({
    id: 0,
    titulo: '',
    descricao: '',
    thumbnail: '',
    categoria: 'Banco de Dados',
    nivel: 'Iniciante',
    status: 'Rascunho',
    estiloAprendizagem: 'Pragmático',
    tags: [],
    instrutor: {
      id: 0,
      nome: '',
      avatar: '',
      bio: ''
    },
    modulos: [],
    recursos: [],
    alunos: 0,
    avaliacao: 0,
    dataCriacao: new Date().toISOString(),
    ultimoUpdate: new Date().toISOString(),
    isPublished: false
  });

  // Função para salvar o curso
  const salvarCurso = async (dadosCurso?: Curso) => {
    if (!curso) return;

    setSaving(true);
    try {
      const cursoParaSalvar = dadosCurso || curso;

      // Preparar os dados completos do curso incluindo módulos e aulas
      const dadosCompletos = {
        ...cursoParaSalvar,
        // Garantir que os módulos e aulas tenham dados consistentes
        modulos: cursoParaSalvar.modulos.map((modulo, index) => ({
          ...modulo,
          ordem: index + 1,
          aulas: modulo.aulas.map((aula, aulaIndex) => ({
            ...aula,
            ordem: aulaIndex + 1,
            // Garantir tipos numéricos
            duracao: typeof aula.duracao === 'string' ? parseInt(aula.duracao) || 0 : aula.duracao || 0
          }))
        }))
      };

      const url = cursoId 
        ? `/api/admin/curso/${cursoId}/carregarCurso`
        : '/api/admin/curso';
      
      const method = cursoId ? 'PUT' : 'POST';
      
      console.log('Salvando curso completo:', { url, method, dadosCompletos });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(cursoParaSalvar)
      });

      if (response.ok) {
        const cursoSalvo = await response.json();
        setCurso(cursoSalvo);
        
        if (!cursoId) {
          // Redirecionar para a página de edição se for um novo curso
          window.location.href = `/admin/cursos/${cursoSalvo.id}/editarCurso`;
        }
        
        return cursoSalvo;
      } else {
        console.error('Erro ao salvar curso');
      }
    } catch (error) {
      console.error('Erro ao salvar curso:', error);
    } finally {
      setSaving(false);
    }
  };

  // Funções de atualização do curso
  const updateCurso = (updates: Partial<Curso>) => {
    if (!curso) return;
    setCurso({ ...curso, ...updates });
  };

  // Funções de atualização de Módulos
  const updateModulo = (moduloId: string, updates: Partial<Modulo>) => {
    if (!curso) return;
    
    const modulosAtualizados = curso.modulos.map(modulo =>
      modulo.id === parseInt(moduloId) ? { ...modulo, ...updates } : modulo
    );
    
    setCurso({ ...curso, modulos: modulosAtualizados });
  };

  // Funções de atualização de Aulas
  const updateAula = (moduloId: string, aulaId: string, updates: Partial<Aula>) => {
    if (!curso) return;
    
    const modulosAtualizados = curso.modulos.map(modulo => {
      if (modulo.id === parseInt(moduloId)) {
        const aulasAtualizadas = modulo.aulas.map(aula =>
          aula.id === parseInt(aulaId) ? { ...aula, ...updates } : aula
        );
        return { ...modulo, aulas: aulasAtualizadas };
      }
      return modulo;
    });
    
    setCurso({ ...curso, modulos: modulosAtualizados });
  };

  const updateRecurso = (recursoId: string, updates: Partial<Recurso>) => {
    if (!curso) return;
    const recursosAtualizados = curso.recursos.map(recurso =>
      recurso.id === parseInt(recursoId) ? { ...recurso, ...updates } : recurso
    );
    setCurso({ ...curso, recursos: recursosAtualizados });
  };

  // Funções de adição de Módulos
  const addModulo = () => {
    if (!curso) return;
    
    // Gerar ID temporário único (negativo para diferenciar dos IDs do banco)
    const tempId = -Date.now();
    
    const novoModulo: Modulo = {
      id: tempId,
      titulo: 'Novo Módulo',
      descricao: '',
      ordem: curso.modulos.length + 1,
      aulas: []
    };
    
    setCurso({
      ...curso,
      modulos: [...curso.modulos, novoModulo]
    });
  };

  const addAula = (moduloId: string) => {
    if (!curso) return;
    
    // Gerar ID temporário único
    const tempId = -Date.now();
    
    const modulosAtualizados = curso.modulos.map(modulo => {
      if (modulo.id === parseInt(moduloId)) {
        const novaAula: Aula = {
          id: tempId,
          titulo: 'Nova Aula',
          descricao: '',
          videoUrl: '',
          duracao: 0,
          ordem: modulo.aulas.length + 1,
          concluida: false
        };
        return {
          ...modulo,
          aulas: [...modulo.aulas, novaAula]
        };
      }
      return modulo;
    });
    
    setCurso({ ...curso, modulos: modulosAtualizados });
  };

  const addRecurso = () => {
    if (!curso) return;
    const novoRecurso: Recurso = {
      id: 0,
      titulo: 'Novo Recurso',
      tipo: 'pdf',
      url: '',
    };
    setCurso({
      ...curso,
      recursos: [...curso.recursos, novoRecurso]
    });
  };

  // Funções de deleção
  const deleteModulo = (moduloId: string) => {
    setModuloToDelete(moduloId);
    setMostrarDeleteModuloModal(true);
  };

  const confirmDeleteModulo = () => {
    if (!curso || !moduloToDelete) return;
    
    const modulosAtualizados = curso.modulos
      .filter(modulo => modulo.id !== parseInt(moduloToDelete))
      .map((modulo, index) => ({ ...modulo, ordem: index + 1 }));
    
    setCurso({ ...curso, modulos: modulosAtualizados });
    setModuloToDelete(null);
    setMostrarDeleteModuloModal(false);
  };

  const deleteAula = (moduloId: string, aulaId: string) => {
    setAulaToDelete({ moduloId, aulaId });
    setMostrarDeleteAulaModal(true);
  };

  const confirmDeleteAula = () => {
    if (!curso || !aulaToDelete) return;
    
    const modulosAtualizados = curso.modulos.map(modulo => {
      if (modulo.id === parseInt(aulaToDelete.moduloId)) {
        const aulasAtualizadas = modulo.aulas
          .filter(aula => aula.id !== parseInt(aulaToDelete.aulaId))
          .map((aula, index) => ({ ...aula, ordem: index + 1 }));
        return { ...modulo, aulas: aulasAtualizadas };
      }
      return modulo;
    });
    
    setCurso({ ...curso, modulos: modulosAtualizados });
    setAulaToDelete(null);
    setMostrarDeleteAulaModal(false);
  };

  const removeRecurso = (recursoId: string) => {
    if (!curso) return;
    const recursosAtualizados = curso.recursos.filter(recurso => recurso.id !== parseInt(recursoId));
    setCurso({ ...curso, recursos: recursosAtualizados });
  };

  // Funções para tags
  const addTag = () => {
    if (!curso || !novaTag.trim()) return;
    const tag = novaTag.trim();
    if (!curso.tags.includes(tag)) {
      setCurso({
        ...curso,
        tags: [...curso.tags, tag]
      });
    }
    setNovaTag("");
  };

  const removeTag = (tagToRemove: string) => {
    if (!curso) return;
    setCurso({
      ...curso,
      tags: curso.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Função para upload de thumbnail
  const uploadThumbnailToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('thumbnail', file);
  
  try {
    const response = await fetch(`/api/admin/curso/${cursoId}/uploadThumbnail`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erro no upload da thumbnail');
    }

    const data = await response.json();
    return data.url; // URL da thumbnail no servidor
  } catch (error) {
    console.error('Erro ao fazer upload da thumbnail:', error);
    throw error;
  }
};

  // Funções para uploads da thumbnail
  const handleThumbnailUpload = async (file: File) => {
    if (!curso) return;
  
    setThumbnailUploading(true);
    try {
      // Fazer upload real para o servidor
      const thumbnailUrl = await uploadThumbnailToServer(file);
      
      // Atualizar preview e curso
      setThumbnailPreview(thumbnailUrl);
      setCurso({ ...curso, thumbnail: thumbnailUrl });
      
      // Salvar automaticamente após upload
      await salvarCurso({ ...curso, thumbnail: thumbnailUrl });
      
    } catch (error) {
      console.error('Erro ao fazer upload da thumbnail:', error);
      // Fallback para preview local em caso de erro
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    } finally {
      setThumbnailUploading(false);
    }
  };

  // Função para remover thumbnail
  const removeThumbnail = async () => {
    if (!curso) return;
    
    setThumbnailPreview("");
    const cursoAtualizado = { ...curso, thumbnail: "" };
    setCurso(cursoAtualizado);
    
    // Salvar automaticamente após remoção
    await salvarCurso(cursoAtualizado);
  };

  // Funções para upload da foto do instrutor
  const uploadFotoInstrutorToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('fotoInstrutor', file);
  
  try {
    const response = await fetch(`/api/admin/curso/${cursoId}/uploadInstrutor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erro no upload da foto do instrutor');
    }

    const data = await response.json();
    return data.url; // URL da foto no servidor
  } catch (error) {
    console.error('Erro ao fazer upload da foto do instrutor:', error);
    throw error;
  }
};

  // Função para fazer upload da foto do instrutor
  const handleFotoInstrutorUpload = async (file: File) => {
    if (!curso) return;
    
    setFotoInstrutorUploading(true);
    try {
      // Fazer upload real para o servidor
      const fotoUrl = await uploadFotoInstrutorToServer(file);
      
      // Atualizar preview e curso
      setFotoInstrutorPreview(fotoUrl);
      const instrutorAtualizado = {
        ...curso.instrutor,
        avatar: fotoUrl
      };
      setCurso({ 
        ...curso, 
        instrutor: instrutorAtualizado 
      });
      
      // Salvar automaticamente após upload
      await salvarCurso({ 
        ...curso, 
        instrutor: instrutorAtualizado 
      });
      
    } catch (error) {
      console.error('Erro ao fazer upload da foto do instrutor:', error);
      // Fallback para preview local em caso de erro
      const previewUrl = URL.createObjectURL(file);
      setFotoInstrutorPreview(previewUrl);
    } finally {
      setFotoInstrutorUploading(false);
    }
  };

  // Função para remover foto do instrutor
  const removeFotoInstrutor = async () => {
    if (!curso) return;
    
    setFotoInstrutorPreview("");
    const instrutorAtualizado = {
      ...curso.instrutor,
      avatar: ""
    };
    const cursoAtualizado = { 
      ...curso, 
      instrutor: instrutorAtualizado 
    };
    
    setCurso(cursoAtualizado);
    
    // Salvar automaticamente após remoção
    await salvarCurso(cursoAtualizado);
  };

  const handleVideoUpload = async (moduloId: string, aulaId: string, file: File) => {
    if (!curso) return;
    
    // Simular upload de vídeo
    updateAula(moduloId, aulaId, { isUploading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const videoUrl = URL.createObjectURL(file);
      updateAula(moduloId, aulaId, { 
        videoUrl,
        isUploading: false 
      });
    } catch (error) {
      console.error('Erro ao fazer upload do vídeo:', error);
      updateAula(moduloId, aulaId, { isUploading: false });
    }
  };

  const removeVideo = (moduloId: string, aulaId: string) => {
    updateAula(moduloId, aulaId, { videoUrl: '' });
  };

  // Funções para expansão de aulas
  const toggleExpansaoAula = (aulaId: string) => {
    const novasAulasExpandida = new Set(aulasExpandida);
    if (novasAulasExpandida.has(aulaId)) {
      novasAulasExpandida.delete(aulaId);
    } else {
      novasAulasExpandida.add(aulaId);
    }
    setAulasExpandida(novasAulasExpandida);
  };

  // Funções de publicação
  const handlePublishToggle = () => {
    setMostrarPublicarModal(true);
  };

  const confirmPublishToggle = async () => {
    if (!curso) return;
    
    const novoStatus: CursoStatus = curso.status === 'Publicado' ? 'Rascunho' : 'Publicado';
    const cursoAtualizado = { ...curso, status: novoStatus };
    
    try {
      await salvarCurso(cursoAtualizado);
    } catch (error) {
      console.error('Erro ao alterar status do curso:', error);
    } finally {
      setMostrarPublicarModal(false);
    }
  };

  // Função para deletar curso
  const confirmDeleteCurso = async () => {
    if (!cursoId) return;
    
    try {
      const response = await fetch(`/api/admin/curso/${cursoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        // Redirecionar para a lista de cursos
        window.location.href = '/admin/cursos';
      } else {
        console.error('Erro ao deletar curso');
      }
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
    }
  };

  return {
    curso,
    loading,
    saving,
    aulasExpandida,
    setAulasExpandida,
    novaTag,
    setNovaTag,
    arquivoThumbnail,
    setArquivoThumbnail,
    thumbnailPreview,
    setThumbnailPreview,
    thumbnailUploading,
    setThumbnailUploading,
    arquivoFotoInstrutor,
    setArquivoFotoInstrutor,
    fotoInstrutorPreview,
    setFotoInstrutorPreview,
    fotoInstrutorUploading,
    setFotoInstrutorUploading,
    mostrarDeleteModuloModal,
    setMostrarDeleteModuloModal,
    mostrarDeleteAulaModal,
    setMostrarDeleteAulaModal,
    mostrarPublicarModal,
    setMostrarPublicarModal,
    mostrarDeleteCursoModal,
    setMostrarDeleteCursoModal,
    mostrarEstiloAprendizagemModal,
    setMostrarEstiloAprendizagemModal,
    moduloToDelete,
    setModuloToDelete,
    aulaToDelete,
    setAulaToDelete,
    salvarCurso,
    updateCurso,
    updateModulo,
    updateAula,
    updateRecurso,
    addModulo,
    addAula,
    addRecurso,
    deleteModulo,
    confirmDeleteModulo,
    deleteAula,
    confirmDeleteAula,
    removeRecurso,
    toggleExpansaoAula,
    handleThumbnailUpload,
    removeThumbnail,
    handleFotoInstrutorUpload,
    removeFotoInstrutor,
    handleVideoUpload,
    removeVideo,
    addTag,
    removeTag,
    handleTagKeyPress,
    handlePublishToggle,
    confirmPublishToggle,
    confirmDeleteCurso,
  };
};