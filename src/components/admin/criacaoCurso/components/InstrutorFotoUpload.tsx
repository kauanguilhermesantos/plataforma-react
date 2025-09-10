// src/components/admin/course-creation/Components/InstructorPhotoUpload.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import { Instrutor } from "@/types/curso";

interface InstrutorFotoUploadProps {
  instrutor: Instrutor;
  uploading: boolean;
  onPhotoUpload: (file: File) => void;
  onPhotoRemove: () => void;
}

export const InstrutorFotoUpload = ({
  instrutor,
  uploading,
  onPhotoUpload,
  onPhotoRemove,
}: InstrutorFotoUploadProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  return (
    <div>
      <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Foto do Instrutor
      </Label>
      <div className="space-y-3">
        {uploading ? (
          <div className="flex items-center gap-2 p-3 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            <span className="text-sm text-slate-700 dark:text-slate-300">Carregando foto...</span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="dark:bg-slate-800 dark:border-slate-700 text-slate-500 dark:text-white file:bg-slate-300 dark:file:bg-slate-600 file:text-slate-800 dark:file:text-white file:border-0 file:rounded file:px-2 file:py-1"
            />
            <Upload className="w-5 h-5 dark:text-slate-400" />
          </div>
        )}

        {instrutor.fotoPreview && !uploading && (
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Preview do Avatar:</span>
              <Button
                type="button"
                onClick={onPhotoRemove}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-7 w-7 bg-transparent"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={instrutor.fotoPreview}
                alt="Preview do avatar do instrutor"
                className="w-16 h-16 rounded-full object-cover dark:bg-slate-700 border-2 dark:border-slate-600"
              />
              <span className="text-xs text-slate-700 dark:text-slate-400">{instrutor.foto}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};