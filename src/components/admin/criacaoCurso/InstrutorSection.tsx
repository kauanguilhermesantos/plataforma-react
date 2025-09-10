// src/components/admin/course-creation/InstructorSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instrutor } from "@/types/curso";
import { InstrutorFotoUpload } from "./components/InstrutorFotoUpload";

interface InstrutorSectionProps {
  instrutor: Instrutor;
  uploading: boolean;
  onInstructorUpdate: (field: keyof Instrutor, value: string) => void;
  onPhotoUpload: (file: File) => void;
  onPhotoRemove: () => void;
}

export const InstrutorSection = ({
  instrutor,
  uploading,
  onInstructorUpdate,
  onPhotoUpload,
  onPhotoRemove,
}: InstrutorSectionProps) => {
  return (
    <Card className="dark:bg-slate-900 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="dark:text-white">Informações do Instrutor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Nome do Instrutor *
            </label>
            <Input
              value={instrutor.nome}
              onChange={(e) => onInstructorUpdate("nome", e.target.value)}
              placeholder="Ex: Prof. Maria Silva"
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              required
            />
          </div>

          <InstrutorFotoUpload
            instrutor={instrutor}
            uploading={uploading}
            onPhotoUpload={onPhotoUpload}
            onPhotoRemove={onPhotoRemove}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Descrição do Instrutor
          </label>
          <Textarea
            value={instrutor.bio}
            onChange={(e) => onInstructorUpdate("bio", e.target.value)}
            placeholder="Descreva a experiência e qualificações do instrutor..."
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};