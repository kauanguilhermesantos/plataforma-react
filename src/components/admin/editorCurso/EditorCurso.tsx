// src/components/admin/course-editor/CourseEditor.tsx
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
import { defaultCourse } from "@/utils/defaultCourse";
import { EditorCursoProps } from "@/types/curso";

export function EditorCurso({ cursoId }: EditorCursoProps) {
  const {
    curso,
    aulasExpandida,
    setAulasExpandida,
    novaTag,
    setNovaTag,
    arquivoThumbnail,
    thumbnailPreview,
    thumbnailUploading,
    arquivoFotoInstrutor,
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
    moduloToDelete,
    aulaToDelete,
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
  } = useEditorCurso(defaultCourse);

  return (
    <div className="space-y-6">
      <CursoHeader 
        curso={curso} 
        onPublishToggle={handlePublishToggle}
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
            onCourseUpdate={updateCurso}
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

        <TabsContent value="content" className="space-y-4">
          <ConteudoTab
            curso={curso}
            aulasExpandida={aulasExpandida}
            onModuleUpdate={updateModulo}
            onLessonUpdate={updateAula}
            onModuleAdd={addModulo}
            onLessonAdd={addAula}
            onModuleDelete={deleteModulo}
            onLessonDelete={deleteAula}
            onLessonToggle={toggleExpansaoAula}
            onVideoUpload={handleVideoUpload}
            onVideoRemove={removeVideo}
          />
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <RecursosTab
            recursos={curso.recursos}
            onResourceUpdate={updateRecurso}
            onResourceAdd={addRecurso}
            onResourceRemove={removeRecurso}
          />
        </TabsContent>

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
        isPublished={curso.isPublished}
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