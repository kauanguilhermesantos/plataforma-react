// src/components/admin/course-creation/CourseInfoSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { CursoFormData, CursoCategoria, NivelCurso, EstiloAprendizagem } from "@/types/curso";
import { ThumbnailUpload } from "./components/ThumbnailUpload";
import { TagsInput } from "./components/TagsInput";

interface CursoInfoSectionProps {
  formData: CursoFormData;
  currentTag: string;
  thumbnailUploading: boolean;
  onFormUpdate: (field: keyof CursoFormData, value: any) => void;
  onTagChange: (value: string) => void;
  onTagAdd: () => void;
  onTagRemove: (tag: string) => void;
  onTagKeyPress: (e: React.KeyboardEvent) => void;
  onThumbnailUpload: (file: File) => void;
  onThumbnailRemove: () => void;
  onShowLearningStyles: () => void;
}

export const CursoInfoSection = ({
  formData,
  currentTag,
  thumbnailUploading,
  onFormUpdate,
  onTagChange,
  onTagAdd,
  onTagRemove,
  onTagKeyPress,
  onThumbnailUpload,
  onThumbnailRemove,
  onShowLearningStyles,
}: CursoInfoSectionProps) => {
  return (
    <Card className="dark:bg-slate-900 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="dark:text-white">Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Título do Curso *
          </label>
          <Input
            value={formData.titulo}
            onChange={(e) => onFormUpdate("titulo", e.target.value)}
            placeholder="Ex: JavaScript Completo - Do Básico ao Avançado"
            className="dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Descrição *
          </label>
          <Textarea
            value={formData.descricao}
            onChange={(e) => onFormUpdate("descricao", e.target.value)}
            placeholder="Descreva o que os alunos aprenderão neste curso..."
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white min-h-[100px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Categoria *
            </label>
            <Select
              value={formData.categoria}
              onValueChange={(value: CursoCategoria) => onFormUpdate("categoria", value)}
            >
              <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent className="text-slate-700 dark:bg-slate-800 dark:border-slate-700">
                <SelectItem 
                  value="programacao"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Programação</SelectItem>
                <SelectItem 
                  value="data-science"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Data Science</SelectItem>
                <SelectItem 
                  value="design"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Design</SelectItem>
                <SelectItem 
                  value="mobile"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Mobile</SelectItem>
                <SelectItem 
                  value="web"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Desenvolvimento Web</SelectItem>
                  <SelectItem 
                  value="banco-de-dados"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Banco de Dados</SelectItem>
                  <SelectItem 
                  value="devops"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  DevOps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Nível *
            </label>
            <Select
              value={formData.nivel}
              onValueChange={(value: NivelCurso) => onFormUpdate("nivel", value)}
            >
              <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent className="text-slate-700 dark:bg-slate-800 dark:border-slate-700">
                <SelectItem 
                  value="iniciante"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Iniciante</SelectItem>
                <SelectItem 
                  value="intermediario"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Intermediário</SelectItem>
                <SelectItem 
                  value="avancado"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Avançado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Estilo de Aprendizagem *
              </label>
              <Button
                type="button"
                onClick={onShowLearningStyles}
                variant="ghost"
                size="sm"
                className="p-1 h-6 w-6 text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            </div>
            <Select
              value={formData.estiloAprendizagem}
              onValueChange={(value: EstiloAprendizagem) => onFormUpdate("estiloAprendizagem", value)}
            >
              <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                <SelectValue placeholder="Selecione o estilo" />
              </SelectTrigger>
              <SelectContent className="text-slate-700 dark:bg-slate-800 dark:border-slate-700">
                <SelectItem 
                  value="pragmatico"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Pragmático</SelectItem>
                <SelectItem 
                  value="teorico"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Teórico</SelectItem>
                <SelectItem 
                  value="ativista"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Ativista</SelectItem>
                <SelectItem 
                  value="reflexivo"
                  className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                >
                  Reflexivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ThumbnailUpload
          uploading={thumbnailUploading}
          thumbnail={formData.thumbnail}
          thumbnailPreview={formData.thumbnailPreview}
          onUpload={onThumbnailUpload}
          onRemove={onThumbnailRemove}
        />

        <TagsInput
          tags={formData.tags}
          currentTag={currentTag}
          onTagChange={onTagChange}
          onTagAdd={onTagAdd}
          onTagRemove={onTagRemove}
          onTagKeyPress={onTagKeyPress}
        />
      </CardContent>
    </Card>
  );
};