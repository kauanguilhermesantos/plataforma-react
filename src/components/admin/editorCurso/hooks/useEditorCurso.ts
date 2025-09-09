// src/components/admin/course-editor/hooks/useCourseEditor.ts
import { useState } from 'react';
import { Curso, Modulo, Aula, Recurso, NivelCurso, EstiloAprendizagem } from '@/types/curso';

interface UseEditorCursoReturn {
  curso: Curso;
  setCurso: React.Dispatch<React.SetStateAction<Curso>>;
  aulasExpandida: Set<number>;
  setAulasExpandida: React.Dispatch<React.SetStateAction<Set<number>>>;
  novaTag: string;
  setNovaTag: React.Dispatch<React.SetStateAction<string>>;
  arquivoThumbnail: File | null;
  setArquivoThumbnail: React.Dispatch<React.SetStateAction<File | null>>;
  thumbnailPreview: string | null;
  setThumbnailPreview: React.Dispatch<React.SetStateAction<string | null>>;
  thumbnailUploading: boolean;
  setThumbnailUploading: React.Dispatch<React.SetStateAction<boolean>>;
  arquivoFotoInstrutor: File | null;
  setArquivoFotoInstrutor: React.Dispatch<React.SetStateAction<File | null>>;
  fotoInstrutorPreview: string | null;
  setfotoInstrutorPreview: React.Dispatch<React.SetStateAction<string | null>>;
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
  moduloToDelete: number | null;
  setModuloToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  aulaToDelete: { moduloId: number; aulaId: number } | null;
  setAulaToDelete: React.Dispatch<React.SetStateAction<{ moduloId: number; aulaId: number } | null>>;
  updateCurso: (field: keyof Curso, value: any) => void;
  updateModulo: (moduloId: number, field: keyof Modulo, value: string) => void;
  updateAula: (moduloId: number, aulaId: number, field: keyof Aula, value: any) => void;
  updateRecurso: (recursoId: number, field: keyof Recurso, value: any) => void;
  addModulo: () => void;
  addAula: (moduloId: number) => void;
  addRecurso: () => void;
  deleteModulo: (moduloId: number) => void;
  confirmDeleteModulo: () => void;
  deleteAula: (moduloId: number, aulaId: number) => void;
  confirmDeleteAula: () => void;
  removeRecurso: (recursoId: number) => void;
  toggleExpansaoAula: (aulaId: number) => void;
  handleThumbnailUpload: (file: File) => Promise<void>;
  removeThumbnail: () => void;
  handleFotoInstrutorUpload: (file: File) => Promise<void>;
  removeFotoInstrutor: () => void;
  handleVideoUpload: (moduloId: number, aulaId: number, file: File) => Promise<void>;
  removeVideo: (moduloId: number, aulaId: number) => void;
  addTag: () => void;
  removeTag: (tagToRemove: string) => void;
  handleTagKeyPress: (e: React.KeyboardEvent) => void;
  handlePublishToggle: () => void;
  confirmPublishToggle: () => void;
  confirmDeleteCurso: () => void;
}

export const useEditorCurso = (cursoInicial: Curso): UseEditorCursoReturn => {
  const [curso, setCurso] = useState<Curso>(cursoInicial);
  const [aulasExpandida, setAulasExpandida] = useState<Set<number>>(new Set());
  const [novaTag, setNovaTag] = useState('');
  const [arquivoThumbnail, setArquivoThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [arquivoFotoInstrutor, setArquivoFotoInstrutor] = useState<File | null>(null);
  const [fotoInstrutorPreview, setfotoInstrutorPreview] = useState<string | null>(null);
  const [fotoInstrutorUploading, setFotoInstrutorUploading] = useState(false);
  const [mostrarDeleteModuloModal, setMostrarDeleteModuloModal] = useState(false);
  const [mostrarDeleteAulaModal, setMostrarDeleteAulaModal] = useState(false);
  const [mostrarPublicarModal, setMostrarPublicarModal] = useState(false);
  const [mostrarDeleteCursoModal, setMostrarDeleteCursoModal] = useState(false);
  const [mostrarEstiloAprendizagemModal, setMostrarEstiloAprendizagemModal] = useState(false);
  const [moduloToDelete, setModuloToDelete] = useState<number | null>(null);
  const [aulaToDelete, setAulaToDelete] = useState<{ moduloId: number; aulaId: number } | null>(null);

  // Funções de atualização
  const updateCurso = (field: keyof Curso, value: any) => {
    setCurso(prev => ({ ...prev, [field]: value }));
  };

  const updateModulo = (moduloId: number, field: keyof Modulo, value: string) => {
    setCurso(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo => 
        modulo.id === moduloId ? { ...modulo, [field]: value } : modulo
      ),
    }));
  };

  const updateAula = (moduloId: number, aulaId: number, field: keyof Aula, value: any) => {
    setCurso(prev => ({
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
      ),
    }));
  };

  const updateRecurso = (recursoId: number, field: keyof Recurso, value: any) => {
    setCurso(prev => ({
      ...prev,
      recursos: prev.recursos.map(recurso =>
        recurso.id === recursoId ? { ...recurso, [field]: value } : recurso
      ),
    }));
  };

  // Funções de adição
  const addModulo = () => {
    const novoModulo: Modulo = {
      id: Date.now(),
      titulo: "Novo Módulo",
      descricao: "Descrição do módulo",
      aulas: [],
    };
    setCurso(prev => ({ ...prev, modulos: [...prev.modulos, novoModulo] }));
  };

  const addAula = (moduloId: number) => {
    const novaAula: Aula = {
      id: Date.now(),
      titulo: "Nova Aula",
      duracao: "00:00",
      tipo: "video",
      descricao: "Descrição da aula",
    };
    setCurso(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo =>
        modulo.id === moduloId ? { ...modulo, aulas: [...modulo.aulas, novaAula] } : modulo
      ),
    }));
  };

  const addRecurso = () => {
    const novoRecurso: Recurso = {
      id: Date.now(),
      titulo: "Novo Recurso",
      tipo: "pdf",
      url: "",
    };
    setCurso(prev => ({ ...prev, recursos: [...prev.recursos, novoRecurso] }));
  };

  // Funções de deleção
  const deleteModulo = (moduloId: number) => {
    setModuloToDelete(moduloId);
    setMostrarDeleteModuloModal(true);
  };

  const confirmDeleteModulo = () => {
    if (moduloToDelete) {
      setCurso(prev => ({
        ...prev,
        modulos: prev.modulos.filter(modulo => modulo.id !== moduloToDelete),
      }));
      setModuloToDelete(null);
      setMostrarDeleteModuloModal(false);
    }
  };

  const deleteAula = (moduloId: number, aulaId: number) => {
    setAulaToDelete({ moduloId, aulaId });
    setMostrarDeleteAulaModal(true);
  };

  const confirmDeleteAula = () => {
    if (aulaToDelete) {
      setCurso(prev => ({
        ...prev,
        modulos: prev.modulos.map(modulo =>
          modulo.id === aulaToDelete.moduloId
            ? { ...modulo, aulas: modulo.aulas.filter(aula => aula.id !== aulaToDelete.aulaId) }
            : modulo
        ),
      }));
      setAulaToDelete(null);
      setMostrarDeleteAulaModal(false);
    }
  };

  const removeRecurso = (recursoId: number) => {
    setCurso(prev => ({
      ...prev,
      recursos: prev.recursos.filter(recurso => recurso.id !== recursoId),
    }));
  };

  // Funções de UI
  const toggleExpansaoAula = (aulaId: number) => {
    setAulasExpandida(prev => {
      const novoSet = new Set(prev);
      if (novoSet.has(aulaId)) {
        novoSet.delete(aulaId);
      } else {
        novoSet.add(aulaId);
      }
      return novoSet;
    });
  };

  // Funções de upload de arquivos
  const handleThumbnailUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 5MB.");
      return;
    }

    setThumbnailUploading(true);
    setArquivoThumbnail(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreview(previewUrl);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurso(prev => ({ ...prev, thumbnail: previewUrl }));
    setThumbnailUploading(false);
  };

  const removeThumbnail = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setArquivoThumbnail(null);
    setThumbnailPreview(null);
    setCurso(prev => ({ ...prev, thumbnail: "/placeholder.svg?height=200&width=300" }));
  };

  const handleFotoInstrutorUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 5MB.");
      return;
    }

    setFotoInstrutorUploading(true);
    setArquivoFotoInstrutor(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setfotoInstrutorPreview(previewUrl);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurso(prev => ({
      ...prev,
      instrutor: { ...prev.instrutor, avatar: previewUrl },
    }));
    setFotoInstrutorUploading(false);
  };

  const removeFotoInstrutor = () => {
    if (fotoInstrutorPreview) {
      URL.revokeObjectURL(fotoInstrutorPreview);
    }
    setArquivoFotoInstrutor(null);
    setfotoInstrutorPreview(null);
    setCurso(prev => ({
      ...prev,
      instrutor: { ...prev.instrutor, avatar: "/placeholder.svg?height=100&width=100" },
    }));
  };

  const handleVideoUpload = async (moduleId: number, lessonId: number, file: File) => {
    if (!file.type.startsWith("video/")) {
      alert("Por favor, selecione apenas arquivos de vídeo.");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 100MB.");
      return;
    }

    // Set uploading state
    updateAula(moduleId, lessonId, "isUploading", true);
    updateAula(moduleId, lessonId, "videoArquivo", file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    updateAula(moduleId, lessonId, "videoPreview", previewUrl);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Update lesson with video URL and clear uploading state
    updateAula(moduleId, lessonId, "videoUrl", previewUrl);
    updateAula(moduleId, lessonId, "isUploading", false);
  };

  const removeVideo = (moduloId: number, aulaId: number) => {
    const aula = curso.modulos.find(m => m.id === moduloId)?.aulas.find(l => l.id === aulaId);

    if (aula?.videoPreview) {
      URL.revokeObjectURL(aula.videoPreview);
    }

    updateAula(moduloId, aulaId, "videoArquivo", undefined);
    updateAula(moduloId, aulaId, "videoPreview", undefined);
    updateAula(moduloId, aulaId, "videoUrl", undefined);
  };

  // Funções de tags
  const addTag = () => {
    if (novaTag.trim() && !curso.tags.includes(novaTag.trim())) {
      setCurso(prev => ({ ...prev, tags: [...prev.tags, novaTag.trim()] }));
      setNovaTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCurso(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Funções de modais
  const handlePublishToggle = () => {
    setMostrarPublicarModal(true);
  };

  const confirmPublishToggle = () => {
    setCurso(prev => ({ ...prev, isPublished: !prev.isPublished }));
    setMostrarPublicarModal(false);
  };

  const confirmDeleteCurso = () => {
    // Aqui seria implementada a lógica de exclusão do curso
    console.log("Excluindo curso:", curso.id);
    setMostrarDeleteCursoModal(false);
    // Redirecionar para lista de cursos após exclusão
    // router.push('/admin')
  };

  return {
    curso,
    setCurso,
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
    setfotoInstrutorPreview,
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