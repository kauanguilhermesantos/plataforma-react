// src/components/admin/course-editor/Components/ResourceItem.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, Eye, X, FileText } from "lucide-react";
import { Recurso } from "@/types/curso";

interface RecursoItemProps {
  recurso: Recurso;
  onUpdate: (recursoId: number, field: keyof Recurso, value: any) => void;
  onRemove: (recursoId: number) => void;
}

export const RecursoItem = ({ recurso, onUpdate, onRemove }: RecursoItemProps) => {
  const handleFileUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Por favor, selecione apenas arquivos PDF.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 10MB.");
      return;
    }

    onUpdate(recurso.id, "isUploading", true);

    setTimeout(() => {
      const url = URL.createObjectURL(file);
      onUpdate(recurso.id, "url", url);
      onUpdate(recurso.id, "arquivo", file);
      onUpdate(recurso.id, "isUploading", false);
    }, 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl p-6">
      {/* Header with title and actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 mr-4">
          <Input
            value={recurso.titulo}
            onChange={(e) => onUpdate(recurso.id, "titulo", e.target.value)}
            placeholder="Digite o título do recurso..."
            className="text-lg font-medium border bg-slate-50 dark:bg-slate-900 focus-visible:ring-0 placeholder:text-muted-foreground/60"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(recurso.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Upload Area */}
      <div className="space-y-4">
        {!recurso.url ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
              id={`pdf-upload-${recurso.id}`}
            />

            {recurso.isUploading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Carregando arquivo...</p>
              </div>
            ) : (
              <label
                htmlFor={`pdf-upload-${recurso.id}`}
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Clique para fazer upload</p>
                  <p className="text-sm text-muted-foreground">Apenas arquivos PDF até 10MB</p>
                </div>
              </label>
            )}
          </div>
        ) : (
          /* File Preview */
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {recurso.arquivo?.name || "Arquivo PDF"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recurso.arquivo ? `${(recurso.arquivo.size / 1024 / 1024).toFixed(2)} MB` : "PDF"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onUpdate(recurso.id, "url", "");
                    onUpdate(recurso.id, "arquivo", undefined);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};