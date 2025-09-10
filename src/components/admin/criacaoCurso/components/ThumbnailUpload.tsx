// src/components/admin/course-creation/Components/ThumbnailUpload.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";

interface ThumbnailUploadProps {
  uploading: boolean;
  thumbnail: string;
  thumbnailPreview?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export const ThumbnailUpload = ({
  uploading,
  thumbnail,
  thumbnailPreview,
  onUpload,
  onRemove,
}: ThumbnailUploadProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Thumbnail do Curso
      </Label>
      <div className="space-y-3">
        {uploading ? (
          <div className="flex items-center gap-2 p-4 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            <span className="text-sm text-slate-700 dark:text-slate-300">Carregando thumbnail...</span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white file:bg-slate-300 file:text-slate-800 dark:file:bg-slate-600 dark:file:text-white file:border-0 file:rounded file:px-2 file:py-1"
            />
            <Upload className="w-5 h-5 dark:text-slate-400" />
          </div>
        )}

        {thumbnailPreview && !uploading && (
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium dark:text-slate-300">Preview da Thumbnail:</span>
              <Button
                type="button"
                onClick={onRemove}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-7 w-7 bg-transparent"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            <img
              src={thumbnailPreview}
              alt="Preview da thumbnail"
              className="w-full max-w-sm h-32 object-cover rounded-lg dark:bg-slate-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};