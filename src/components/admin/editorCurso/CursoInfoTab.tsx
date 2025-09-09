// src/components/admin/course-editor/CourseInfoTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, HelpCircle } from "lucide-react";
import { Curso, NivelCurso, EstiloAprendizagem } from "@/types/curso";
import { ThumbnailUpload } from "./components/ThumbnailUpload";
import { InstrutorInfo } from "./components/InstrutorInfo";

interface CursoInfoTabProps {
  curso: Curso;
  novaTag: string;
  thumbnailPreview: string | null;
  thumbnailUploading: boolean;
  fotoInstrutorPreview: string | null;
  fotoInstrutorUploading: boolean;
  onCourseUpdate: (field: keyof Curso, value: any) => void;
  onTagChange: (value: string) => void;
  onTagAdd: () => void;
  onTagRemove: (tag: string) => void;
  onTagKeyPress: (e: React.KeyboardEvent) => void;
  onThumbnailUpload: (file: File) => void;
  onThumbnailRemove: () => void;
  onInstructorPhotoUpload: (file: File) => void;
  onInstructorPhotoRemove: () => void;
  onShowLearningStyles: () => void;
}

export const CursoInfoTab = ({
  curso,
  novaTag,
  thumbnailPreview,
  thumbnailUploading,
  fotoInstrutorPreview,
  fotoInstrutorUploading,
  onCourseUpdate,
  onTagChange,
  onTagAdd,
  onTagRemove,
  onTagKeyPress,
  onThumbnailUpload,
  onThumbnailRemove,
  onInstructorPhotoUpload,
  onInstructorPhotoRemove,
  onShowLearningStyles,
}: CursoInfoTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Informações do Curso */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Curso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Curso</Label>
              <Input
                id="title"
                value={curso.titulo}
                onChange={(e) => onCourseUpdate("titulo", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={curso.descricao}
                onChange={(e) => onCourseUpdate("descricao", e.target.value)}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={curso.categoria}
                  onValueChange={(value) => onCourseUpdate("categoria", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Programação">Programação</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Nível</Label>
                <Select
                  value={curso.nivel}
                  onValueChange={(value: NivelCurso) => onCourseUpdate("nivel", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Iniciante">Iniciante</SelectItem>
                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                    <SelectItem value="Avançado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
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
                  value={curso.estiloAprendizagem}
                  onValueChange={(value: EstiloAprendizagem) => onCourseUpdate("estiloAprendizagem", value)}
                >
                  <SelectTrigger className="dark:border-slate-800 dark:text-white">
                    <SelectValue placeholder="Selecione o estilo" />
                  </SelectTrigger>
                  <SelectContent className="text-slate-700 dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem 
                      value="Pragmático"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >
                      Pragmático
                    </SelectItem>
                    <SelectItem 
                      value="Teórico"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >
                      Teórico
                    </SelectItem>
                    <SelectItem 
                      value="Ativista"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >
                      Ativista
                    </SelectItem>
                    <SelectItem 
                      value="Reflexivo"
                      className="dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer"
                    >
                      Reflexivo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={novaTag}
                  onChange={(e) => onTagChange(e.target.value)}
                  onKeyPress={onTagKeyPress}
                  placeholder="Digite uma tag..."
                  className="flex-1"
                />
                <Button type="button" onClick={onTagAdd} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {curso.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => onTagRemove(tag)} 
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thumbnail */}
        <Card>
          <CardHeader>
            <CardTitle>Thumbnail do Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <ThumbnailUpload
              thumbnail={curso.thumbnail}
              thumbnailPreview={thumbnailPreview}
              uploading={thumbnailUploading}
              onUpload={onThumbnailUpload}
              onRemove={onThumbnailRemove}
            />
          </CardContent>
        </Card>
      </div>

      {/* Instrutor */}
      <div className="space-y-6">
        <InstrutorInfo
          instrutor={curso.instrutor}
          fotoPreview={fotoInstrutorPreview}
          uploading={fotoInstrutorUploading}
          onPhotoUpload={onInstructorPhotoUpload}
          onPhotoRemove={onInstructorPhotoRemove}
          onNameChange={(name) => onCourseUpdate("instrutor", { ...curso.instrutor, name })}
          onBioChange={(bio) => onCourseUpdate("instrutor", { ...curso.instrutor, bio })}
        />
      </div>
    </div>
  );
};