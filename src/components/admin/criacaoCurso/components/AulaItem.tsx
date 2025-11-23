// src/components/admin/course-creation/Components/LessonItem.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Play, X, Upload, Loader2 } from "lucide-react";
import { Aula } from "@/types/curso";

interface AulaItemProps {
  moduloId: number;
  aula: Aula;
  aulaIndex: number;
  onLessonUpdate: (moduloId: number, aulaId: number, field: keyof Aula, value: string | number) => void;
  onLessonRemove: (moduloId: number, aulaId: number) => void;
  onVideoUpload: (moduloId: number, aulaId: number, file: File) => void;
  onVideoRemove: (moduloId: number, aulaId: number) => void;
}

export const AulaItem = ({
  moduloId,
  aula,
  aulaIndex,
  onLessonUpdate,
  onLessonRemove,
  onVideoUpload,
  onVideoRemove,
}: AulaItemProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoUpload(moduloId, aula.id, file);
    }
  };

  return (
    <div className="p-4 dark:bg-slate-800 rounded-lg space-y-3">
      <div className="flex items-center gap-3">
        <Play className="w-4 h-4 dark:text-slate-400" />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            value={aula.titulo}
            onChange={(e) => onLessonUpdate(moduloId, aula.id, "titulo", e.target.value)}
            placeholder={`Aula ${aulaIndex + 1}: Título da aula`}
            className="dark:bg-slate-700 border-slate-300 dark:border-slate-600 dark:text-white"
          />
          <Input
            type="number"
            value={aula.duracao}
            onChange={(e) => onLessonUpdate(moduloId, aula.id, "duracao", parseInt(e.target.value) || 0)}
            placeholder="Duração (ex: 15:30)"
            className="dark:bg-slate-700 border-slate-300 dark:border-slate-600 dark:text-white"
          />
        </div>
        <Button
          type="button"
          onClick={() => onLessonRemove(moduloId, aula.id)}
          variant="outline"
          size="sm"
          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-7 w-7"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>

      <div>
        <Label className="block text-sm font-medium dark:text-slate-300 mb-2">
          Descrição da Aula
        </Label>
        <Textarea
          value={aula.descricao}
          onChange={(e) => onLessonUpdate(moduloId, aula.id, "descricao", e.target.value)}
          placeholder="Descreva o conteúdo desta aula..."
          className="dark:bg-slate-700 border-slate-300 dark:border-slate-600 dark:text-white min-h-[80px]"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Label className="text-sm font-medium dark:text-slate-300">Vídeo da Aula:</Label>
          <div className="flex-1">
            {aula.isUploading ? (
              <div className="flex items-center gap-2 p-3 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600">
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Carregando vídeo...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-white file:bg-slate-400 dark:file:bg-slate-600 file:text-slate-800 dark:file:text-white file:border-0 file:rounded file:px-2 file:py-1"
                />
                <Upload className="w-4 h-4 dark:text-slate-400" />
              </div>
            )}
          </div>
        </div>

        {aula.videoPreview && !aula.isUploading && (
          <div className="bg-slate-200 dark:bg-slate-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium dark:text-slate-300">Pré-visualização:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">{aula.videoArquivo}</span>
                <Button
                  type="button"
                  onClick={() => onVideoRemove(moduloId, aula.id)}
                  variant="outline"
                  size="sm"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-6 w-6"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <video
              src={aula.videoPreview}
              controls
              className="w-full max-w-md h-32 bg-black rounded"
              preload="metadata"
            >
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};