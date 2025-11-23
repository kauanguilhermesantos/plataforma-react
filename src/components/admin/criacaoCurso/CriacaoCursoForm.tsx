// src/components/admin/course-creation/CourseCreationForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useCriacaoCurso } from "../../../hooks/useCriacaoCurso";
import { CursoInfoSection } from "./CursoInfoSection";
import { InstrutorSection } from "./InstrutorSection";
import { ModulosSection } from "./ModulosSection";
import { DeleteConfirmacaoModal } from "./modals/DeleteConfirmacaoModal";
import { EstiloAprendizagemModal } from "./modals/EstiloAprendizagemModal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CriacaoCursoForm() {
  const {
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
    handleCancel,
    confirmDeleteCurso,
  } = useCriacaoCurso();

  return (
    <>
      {/* Div Header */}
      <div className="flex items-center mb-6 space-x-4">
        {/* Div Botão Voltar */}
        <div className="flex items-center">
          <Link href="/admin/cursos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
        {/* Div Título */}
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Criar Novo Curso</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Preencha as informações para criar um novo curso
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CursoInfoSection
          formData={formData}
          currentTag={currentTag}
          thumbnailUploading={thumbnailUploading}
          onFormUpdate={updateFormData}
          onTagChange={setCurrentTag}
          onTagAdd={addTag}
          onTagRemove={removeTag}
          onTagKeyPress={handleTagKeyPress}
          onThumbnailUpload={handleThumbnailUpload}
          onThumbnailRemove={removeThumbnail}
          onShowLearningStyles={() => setMostrarEstiloAprendizagemModal(true)}
        />

        <InstrutorSection
          instrutor={formData.instrutor}
          uploading={instrutorFotoUploading}
          onInstructorUpdate={updateInstrutor}
          onPhotoUpload={handleInstrutorFotoUpload}
          onPhotoRemove={removeInstrutorFoto}
        />

        <ModulosSection
          modulos={formData.modulos}
          onModuleAdd={addModulo}
          onModuleUpdate={updateModulo}
          onModuleRemove={removeModulo}
          onLessonAdd={addAula}
          onLessonUpdate={updateAula}
          onLessonRemove={removeAula}
          onVideoUpload={handleVideoUpload}
          onVideoRemove={removeVideo}
        />

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="border-slate-300 dark:border-slate-700 dark:text-slate-300 bg-transparent"
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Criar Curso
          </Button>
        </div>
      </form>

      <DeleteConfirmacaoModal
        open={mostrarDeleteModal}
        onOpenChange={setMostrarDeleteModal}
        onConfirm={confirmDeleteCurso}
      />

      <EstiloAprendizagemModal
        open={mostrarEstiloAprendizagemModal}
        onOpenChange={setMostrarEstiloAprendizagemModal}
      />
    </>
  );
}