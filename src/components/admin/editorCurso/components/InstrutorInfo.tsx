import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Loader2 } from "lucide-react";
import { Instrutor } from "@/types/curso";
import { useState } from "react";

interface InstrutorInfoProps {
  instrutor: Instrutor;
  fotoPreview: string | null;
  uploading: boolean;
  onPhotoUpload: (file: File) => void;
  onPhotoRemove: () => void;
  onNameChange: (name: string) => void;
  onBioChange: (bio: string) => void;
}

export const InstrutorInfo = ({
  instrutor,
  fotoPreview,
  uploading,
  onPhotoUpload,
  onPhotoRemove,
  onNameChange,
  onBioChange,
}: InstrutorInfoProps) => {
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
      
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('Arquivo muito grande. Tamanho máximo: 2MB');
        return;
      }
      
      onPhotoUpload(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instrutor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h3 className="font-medium">Informações do Instrutor</h3>

          <div className="flex items-center space-x-4">
            <div className="relative">
              {uploading ? (
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                </div>
              ) : (
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={fotoPreview || instrutor.avatar}
                  />
                  <AvatarFallback>{instrutor.nome[0]}</AvatarFallback>
                </Avatar>
              )}
              {fotoPreview && (
                <Button
                  type="button"
                  onClick={onPhotoRemove}
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="instructor-photo-upload" className="cursor-pointer">
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    {fotoPreview ? "Alterar Foto" : "Adicionar Foto"}
                  </span>
                </Button>
                <input
                  id="instructor-photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Nome do Instrutor</Label>
            <Input
              value={instrutor.nome}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Biografia</Label>
            <Textarea
              value={instrutor.bio}
              onChange={(e) => onBioChange(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};