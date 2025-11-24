import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import { Curso } from "@/types/curso";

interface CursoHeaderProps {
  curso: Curso;
  onPublishToggle: () => void;
  onSave: () => void;
  saving?: boolean;
}

export const CursoHeader = ({ curso, onPublishToggle, onSave, saving = false }: CursoHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <Link href="/admin/cursos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Editar Curso</h1>
          <p className="text-muted-foreground">Gerencie o conteúdo e configurações do curso</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between">
        <Badge variant={curso.status === "Publicado" ? "default" : curso.status === "Rascunho" ? "secondary" : "destructive"}>
          {curso.status}
        </Badge>
        <div className="flex items-center space-x-2">
          <Label htmlFor="publish-toggle" className="text-sm">
            {curso.status === "Publicado" ? "Publicado" : "Rascunho"}
          </Label>
          <Switch 
            id="publish-toggle" 
            checked={curso.status === "Publicado"} 
            onCheckedChange={onPublishToggle} 
          />
        </div>
        <Link href={`/admin/cursos/${curso.id}/preview`}>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
        </Link>
        <Button onClick={onSave} disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {saving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};