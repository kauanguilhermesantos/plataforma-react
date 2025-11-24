// components/admin/editorCurso/EditorCurso.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CursoInfoTab } from "./CursoInfoTab";
import { ConteudoTab } from "./ConteudoTab";
import { RecursosTab } from "./RecursosTab";
import { ConfigTab } from "./ConfigTab";
import { CursoHeader } from "./CursoHeader";
import { StatsCards } from "./StatsCards";
import { DeleteModuloModal } from "./modals/DeleteModuloModal";
import { DeleteAulaModal } from "./modals/DeleteAulaModal";
import { PublishModal } from "./modals/PublishModal";
import { DeleteCursoModal } from "./modals/DeleteCursoModal";
import { EstiloAprendizagemModal } from "./modals/EstiloAprendizagemModal";
import { useEditorCurso } from "./hooks/useEditorCurso";
import { EditorCursoProps } from "@/types/curso";

export function EditorCurso({ cursoId }: EditorCursoProps) {
  const {
    curso,
    loading,
    saving,
    aulasExpandida,
    novaTag,
    setNovaTag,
    thumbnailPreview,
    thumbnailUploading,
    fotoInstrutorPreview,
    fotoInstrutorUploading,
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
    addTag,
    removeTag,
    handleTagKeyPress,
    handlePublishToggle,
    confirmPublishToggle,
    confirmDeleteCurso,
  } = useEditorCurso(cursoId);

  // Se não há curso, mostrar erro
  if (!curso) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Curso não encontrado</h2>
          <p className="text-gray-600 mt-2">O curso que você está tentando editar não existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CursoHeader 
        curso={curso} 
        onPublishToggle={handlePublishToggle}
        onSave={() => salvarCurso()}
        saving={saving}
      />
      
      <StatsCards curso={curso} />
      
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 gap-1 md:grid-cols-4 h-full">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <CursoInfoTab
            curso={curso}
            novaTag={novaTag}
            thumbnailPreview={thumbnailPreview}
            thumbnailUploading={thumbnailUploading}
            fotoInstrutorPreview={fotoInstrutorPreview}
            fotoInstrutorUploading={fotoInstrutorUploading}
            onCourseUpdate={(field, value) => updateCurso({ [field]: value } as Partial<any>)}
            onTagChange={setNovaTag}
            onTagAdd={addTag}
            onTagRemove={removeTag}
            onTagKeyPress={handleTagKeyPress}
            onThumbnailUpload={handleThumbnailUpload}
            onThumbnailRemove={removeThumbnail}
            onInstructorPhotoUpload={handleFotoInstrutorUpload}
            onInstructorPhotoRemove={removeFotoInstrutor}
            onShowLearningStyles={() => setMostrarEstiloAprendizagemModal(true)}
          />
        </TabsContent>

        {/* <TabsContent value="content" className="space-y-4">
          <ConteudoTab
            curso={curso}
            aulasExpandida={new Set(Array.from(aulasExpandida).map(s => Number(s)))}
            onModuleUpdate={(moduloId, field, value) => updateModulo(String(moduloId), { [field]: value } as any)}
            onLessonUpdate={(moduloId, aulaId, field, value) => updateAula(String(moduloId), String(aulaId), { [field]: value } as any)}
            onModuleAdd={addModulo}
            onLessonAdd={(moduloId) => addAula(String(moduloId))}
            onModuleDelete={(moduloId) => deleteModulo(String(moduloId))}
            onLessonDelete={(moduloId, aulaId) => deleteAula(String(moduloId), String(aulaId))}
            onLessonToggle={(aulaId) => toggleExpansaoAula(String(aulaId))}
            onSave={salvarCurso} onVideoUpload={function (moduloId: number, aulaId: number, file: File): void {
              throw new Error("Function not implemented.");
            } } onVideoRemove={function (moduloId: number, aulaId: number): void {
              throw new Error("Function not implemented.");
            } }          />
        </TabsContent> */}

        {/* <TabsContent value="resources" className="space-y-4">
          <RecursosTab
            recursos={curso.recursos}
            onResourceUpdate={updateRecurso}
            onResourceAdd={addRecurso}
            onResourceRemove={removeRecurso}
          />
        </TabsContent> */}

        <TabsContent value="settings" className="space-y-4">
          <ConfigTab
            curso={curso}
            onPublishToggle={handlePublishToggle}
            onDeleteCourse={() => setMostrarDeleteCursoModal(true)}
          />
        </TabsContent>
      </Tabs>

      {/* Modais */}
      <DeleteModuloModal
        open={mostrarDeleteModuloModal}
        onOpenChange={setMostrarDeleteModuloModal}
        onConfirm={confirmDeleteModulo}
      />

      <DeleteAulaModal
        open={mostrarDeleteAulaModal}
        onOpenChange={setMostrarDeleteAulaModal}
        onConfirm={confirmDeleteAula}
      />

      <PublishModal
        open={mostrarPublicarModal}
        onOpenChange={setMostrarPublicarModal}
        isPublished={curso.status === 'Publicado'}
        onConfirm={confirmPublishToggle}
      />

      <DeleteCursoModal
        open={mostrarDeleteCursoModal}
        onOpenChange={setMostrarDeleteCursoModal}
        courseTitle={curso.titulo}
        onConfirm={confirmDeleteCurso}
      />

      <EstiloAprendizagemModal
        open={mostrarEstiloAprendizagemModal}
        onOpenChange={setMostrarEstiloAprendizagemModal}
      />
    </div>
  );
}