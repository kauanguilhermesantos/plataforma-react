// src/components/admin/course-creation/hooks/useCourseCreation.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CursoFormData, Modulo, Aula, CursoCategoria, NivelCurso, EstiloAprendizagem, Instrutor } from '@/types/curso';

interface UseCriacaoCursoReturn {
  formData: CursoFormData;
  currentTag: string;
  thumbnailUploading: boolean;
  instrutorFotoUploading: boolean;
  mostrarDeleteModal: boolean;
  mostrarEstiloAprendizagemModal: boolean;
  setCurrentTag: (tag: string) => void;
  setMostrarDeleteModal: (show: boolean) => void;
  setMostrarEstiloAprendizagemModal: (show: boolean) => void;
  updateFormData: (field: keyof CursoFormData, value: any) => void;
  updateInstrutor: (field: keyof Instrutor, value: string) => void;
  handleThumbnailUpload: (file: File) => Promise<void>;
  removeThumbnail: () => void;
  handleInstrutorFotoUpload: (file: File) => Promise<void>;
  removeInstrutorFoto: () => void;
  addTag: () => void;
  removeTag: (tagToRemove: string) => void;
  handleTagKeyPress: (e: React.KeyboardEvent) => void;
  addModulo: () => void;
  updateModulo: (moduloId: number, titulo: string) => void;
  removeModulo: (moduloId: number) => void;
  addAula: (moduloId: number) => void;
  updateAula: (moduloId: number, aulaId: number, field: keyof Aula, value: string) => void;
  removeAula: (moduloId: number, aulaId: number) => void;
  handleVideoUpload: (moduloId: number, aulaId: number, file: File) => Promise<void>;
  removeVideo: (moduloId: number, aulaId: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSaveDraft: () => void;
  handleCancel: () => void;
  confirmDeleteCurso: () => void;
}

export const useCriacaoCurso = (): UseCriacaoCursoReturn => {
  const router = useRouter();
  const [formData, setFormData] = useState<CursoFormData>({
    titulo: "",
    descricao: "",
    categoria: "",
    nivel: "",
    estiloAprendizagem: "",
    thumbnail: "",
    tags: [],
    instrutor: {
      nome: "",
      foto: "",
      bio: "",
    },
    modulos: [],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [instrutorFotoUploading, setInstrutorFotoUploading] = useState(false);
  const [mostrarDeleteModal, setMostrarDeleteModal] = useState(false);
  const [mostrarEstiloAprendizagemModal, setMostrarEstiloAprendizagemModal] = useState(false);

  // Funções de atualização do formulário
  const updateFormData = (field: keyof CursoFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateInstrutor = (field: keyof Instrutor, value: string) => {
    setFormData(prev => ({
      ...prev,
      instrutor: { ...prev.instrutor, [field]: value }
    }));
  };

  // Upload de thumbnail
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
    try {
      const previewUrl = URL.createObjectURL(file);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData(prev => ({ 
        ...prev, 
        thumbnail: file.name,
        thumbnailPreview: previewUrl 
      }));
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
    } finally {
      setThumbnailUploading(false);
    }
  };

  const removeThumbnail = () => {
    setFormData(prev => ({ 
      ...prev, 
      thumbnail: "",
      thumbnailPreview: undefined 
    }));
  };

  // Upload de foto do instrutor
  const handleInstrutorFotoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 5MB.");
      return;
    }

    setInstrutorFotoUploading(true);
    try {
      const previewUrl = URL.createObjectURL(file);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData(prev => ({
        ...prev,
        instrutor: { 
          ...prev.instrutor, 
          foto: file.name,
          fotoPreview: previewUrl 
        }
      }));
    } catch (error) {
      console.error("Error uploading instructor photo:", error);
    } finally {
      setInstrutorFotoUploading(false);
    }
  };

  const removeInstrutorFoto = () => {
    setFormData(prev => ({
      ...prev,
      instrutor: { 
        ...prev.instrutor, 
        foto: "",
        fotoPreview: undefined 
      }
    }));
  };

  // Manipulação de tags
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Manipulação de módulos
  const addModulo = () => {
    const novoModulo: Modulo = {
      id: Date.now(),
      titulo: "",
      aulas: [],
    };
    setFormData(prev => ({ ...prev, modulos: [...prev.modulos, novoModulo] }));
  };

  const updateModulo = (moduloId: number, titulo: string) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo => 
        modulo.id === moduloId ? { ...modulo, titulo } : modulo
      )
    }));
  };

  const removeModulo = (moduloId: number) => {
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.filter(modulo => modulo.id !== moduloId)
    }));
  };

  // Manipulação de aulas
  const addAula = (moduloId: number) => {
    const novaAula: Aula = {
      id: Date.now(),
      titulo: "",
      duracao: "",
      descricao: "",
      tipo: "video",
    };
    setFormData(prev => ({
      ...prev,
      modulos: prev.modulos.map(modulo =>
        modulo.id === moduloId ? { ...modulo, aulas: [...modulo.aulas, novaAula] } : modulo
      )
    }));
  };

  const updateAula = (moduloId: number, aulaId: number, field: keyof Aula, value: string) => {
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

  // Upload de vídeo
  const handleVideoUpload = async (moduloId: number, aulaId: number, file: File) => {
    if (!file.type.startsWith("video/")) {
      alert("Por favor, selecione apenas arquivos de vídeo.");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 100MB.");
      return;
    }

    // Set uploading state
    updateAula(moduloId, aulaId, "isUploading", undefined);

    try {
      const previewUrl = URL.createObjectURL(file);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
                        videoFile: file.name,
                        videoPreview: previewUrl,
                        isUploading: false,
                      }
                    : aula
                ),
              }
            : modulo
        )
      }));
    } catch (error) {
      updateAula(moduloId, aulaId, "isUploading", undefined);
    }
  };

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
                      videoFile: undefined,
                      videoPreview: undefined,
                      isUploading: false,
                    }
                  : aula
              ),
            }
          : modulo
      )
    }));
  };

  // Ações do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Course data:", formData);
    router.push("/admin");
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", { ...formData, status: "draft" });
    alert("Rascunho salvo com sucesso!");
  };

  const handleCancel = () => {
    router.push("/admin");
  };

  const confirmDeleteCurso = () => {
    console.log("Deleting course...");
    setMostrarDeleteModal(false);
    router.push("/admin");
  };

  return {
    formData,
    currentTag,
    thumbnailUploading,
    instrutorFotoUploading,
    mostrarDeleteModal,
    mostrarEstiloAprendizagemModal,
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
    handleSaveDraft,
    handleCancel,
    confirmDeleteCurso,
  };
};