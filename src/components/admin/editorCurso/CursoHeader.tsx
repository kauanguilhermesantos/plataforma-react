// src/components/admin/course-editor/Components/CourseHeader.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { Curso } from "@/types/curso";

interface CursoHeaderProps {
  curso: Curso;
  onPublishToggle: () => void;
}

export const CursoHeader = ({ curso, onPublishToggle }: CursoHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/admin/cursos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Editar Curso</h1>
          <p className="text-muted-foreground">Gerencie o conteúdo e configurações do curso</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant={curso.isPublished ? "default" : "secondary"}>
          {curso.isPublished ? "Publicado" : "Rascunho"}
        </Badge>
        <div className="flex items-center space-x-2">
          <Label htmlFor="publish-toggle" className="text-sm">
            {curso.isPublished ? "Publicado" : "Rascunho"}
          </Label>
          <Switch 
            id="publish-toggle" 
            checked={curso.isPublished} 
            onCheckedChange={onPublishToggle} 
          />
        </div>
        <Link href={`/admin/cursos/${curso.id}/preview`}>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
        </Link>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};