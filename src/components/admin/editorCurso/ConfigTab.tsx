// src/components/admin/course-editor/SettingsTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, BarChart3, Zap, Trash2, Users, Star } from "lucide-react";
import { Curso } from "@/types/curso";

interface ConfigTabProps {
  curso: Curso;
  onPublishToggle: () => void;
  onDeleteCourse: () => void;
}

export const ConfigTab = ({ curso, onPublishToggle, onDeleteCourse }: ConfigTabProps) => {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações de Publicação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status de Publicação */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${curso.isPublished ? "bg-green-500" : "bg-yellow-500"}`}
                />
                <Label htmlFor="published" className="font-medium">
                  {curso.isPublished ? "Publicado" : "Rascunho"}
                </Label>
              </div>
              <Switch 
                id="published" 
                checked={curso.isPublished} 
                onCheckedChange={onPublishToggle} 
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {curso.isPublished
                ? "Curso visível para todos os estudantes na plataforma"
                : "Curso em desenvolvimento, visível apenas para administradores"}
            </p>
          </div>

          {/* Estatísticas */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Estatísticas do Curso
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Estudantes</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{curso.alunos.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Avaliação</p>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{curso.avaliacao}</p>
              </div>
            </div>
          </div>

          {/* Ações do Curso */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Ações do Curso
            </h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-white hover:bg-red-500 border-red-200 dark:border-red-800 bg-transparent"
                onClick={onDeleteCourse}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Curso Permanentemente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};