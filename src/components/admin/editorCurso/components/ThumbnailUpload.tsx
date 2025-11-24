import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import { useState } from "react";

interface ThumbnailUploadProps {
  thumbnail: string;
  thumbnailPreview: string | null;
  uploading: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export const ThumbnailUpload = ({
  thumbnail,
  thumbnailPreview,
  uploading,
  onUpload,
  onRemove,
}: ThumbnailUploadProps) => {

  const [uploadError, setUploadError] = useState<string | null>(null);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    
    if (file) {
      // Validações adicionais no frontend
      if (!file.type.startsWith('image/')) {
        setUploadError('Por favor, selecione um arquivo de imagem');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Arquivo muito grande. Tamanho máximo: 5MB');
        return;
      }
      
      onUpload(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Thumbnail do Curso</Label>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm text-muted-foreground">Carregando imagem...</p>
          </div>
        ) : thumbnailPreview ? (
          <div className="relative">
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="max-w-full h-48 object-cover rounded-lg mx-auto"
            />
            <Button
              type="button"
              onClick={onRemove}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="max-w-full h-48 object-cover rounded-lg mx-auto"
            />
            <div className="flex justify-center">
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                <Button type="button" variant="outline" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Alterar Imagem
                  </span>
                </Button>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};