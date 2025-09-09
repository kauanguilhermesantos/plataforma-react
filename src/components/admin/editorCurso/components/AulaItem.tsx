// src/components/admin/course-editor/Components/LessonItem.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, Play, Trash2, Upload, X, Loader2, Eye } from "lucide-react";
import { Aula } from "@/types/curso";

interface AulaItemProps {
  moduloId: number;
  aula: Aula;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (field: keyof Aula, value: any) => void;
  onDelete: () => void;
  onVideoUpload: (file: File) => void;
  onVideoRemove: () => void;
}

export const AulaItem = ({
  moduloId,
  aula,
  isExpanded,
  onToggle,
  onUpdate,
  onDelete,
  onVideoUpload,
  onVideoRemove,
}: AulaItemProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoUpload(file);
    }
  };

  return (
    <div className="p-4 bg-muted rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-3 flex-1 cursor-pointer"
          onClick={onToggle}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <Play className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{aula.titulo}</span>
              {aula.duracao && (
                <p className="text-xs text-muted-foreground">{aula.duracao}</p>
              )}
            </div>
          </div>
        </div>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          variant="outline"
          size="sm"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground p-1 h-7 w-7"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {isExpanded && (
        <div className="p-4 border-t bg-muted/20 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium dark:text-slate-300 mb-2">
                Título da Aula *
              </Label>
              <Input
                value={aula.titulo}
                onChange={(e) => onUpdate("titulo", e.target.value)}
                placeholder="Título da aula"
                className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            </div>
            <div>
              <Label className="text-sm font-medium dark:text-slate-300 mb-2">Duração</Label>
              <Input
                value={aula.duracao}
                onChange={(e) => onUpdate("duracao", e.target.value)}
                placeholder="Duração (ex: 15:30)"
                className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium dark:text-slate-300 mb-2">Descrição da Aula</Label>
            <Textarea
              value={aula.descricao || ""}
              onChange={(e) => onUpdate("descricao", e.target.value)}
              placeholder="Descreva o conteúdo desta aula..."
              className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-sm font-medium dark:text-slate-300 mb-2">Vídeo da Aula</Label>

            {aula.isUploading ? (
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-700 rounded-lg">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium dark:text-slate-300">Carregando vídeo...</p>
                  <p className="text-xs dark:text-slate-400">Por favor, aguarde</p>
                </div>
              </div>
            ) : aula.videoPreview ? (
              <div className="bg-white border border-slate-200 dark:bg-slate-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium dark:text-slate-300">Pré-visualização:</span>
                  <Button
                    type="button"
                    onClick={onVideoRemove}
                    variant="destructive"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <video src={aula.videoPreview} controls className="w-full max-h-48 rounded" />
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center bg-white dark:bg-slate-700/50">
                <Upload className="w-8 h-8 dark:text-slate-400 mx-auto mb-2" />
                <p className="text-sm dark:text-slate-300 mb-2">Clique para fazer upload do vídeo</p>
                <p className="text-xs dark:text-slate-400 mb-3">MP4, AVI, MOV até 100MB</p>
                <label htmlFor={`video-upload-${aula.id}`} className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>Selecionar Vídeo</span>
                  </Button>
                  <input
                    id={`video-upload-${aula.id}`}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};