// src/components/admin/course-editor/ResourcesTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Recurso } from "@/types/curso";
import { RecursoItem } from "./components/RecursoItem";

interface RecursosTabProps {
  recursos: Recurso[];
  onResourceUpdate: (recursoId: number, field: keyof Recurso, value: any) => void;
  onResourceAdd: () => void;
  onResourceRemove: (recursoId: number) => void;
}

export const RecursosTab = ({
  recursos,
  onResourceUpdate,
  onResourceAdd,
  onResourceRemove,
}: RecursosTabProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recursos do Curso</CardTitle>
          <Button onClick={onResourceAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Recurso
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recursos.map((recurso) => (
            <RecursoItem
              key={recurso.id}
              recurso={recurso}
              onUpdate={onResourceUpdate}
              onRemove={onResourceRemove}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};