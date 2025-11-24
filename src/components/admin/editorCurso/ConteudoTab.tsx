// src/components/admin/course-editor/ContentTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { Curso, Modulo, Aula } from "@/types/curso";
import { ModuloItem } from "./components/ModuloItem";

interface ConteudoTabProps {
  curso: Curso;
  aulasExpandida: Set<number>;
  onModuleUpdate: (moduloId: number, field: keyof Modulo, value: string) => void;
  onLessonUpdate: (moduloId: number, aulaId: number, field: keyof Aula, value: any) => void;
  onModuleAdd: () => void;
  onLessonAdd: (moduloId: number) => void;
  onModuleDelete: (moduloId: number) => void;
  onLessonDelete: (moduloId: number, aulaId: number) => void;
  onLessonToggle: (aulaId: number) => void;
  onVideoUpload: (moduloId: number, aulaId: number, file: File) => void;
  onVideoRemove: (moduloId: number, aulaId: number) => void;
  onSave: () => void;
}

export const ConteudoTab = ({
  curso,
  aulasExpandida,
  onModuleUpdate,
  onLessonUpdate,
  onModuleAdd,
  onLessonAdd,
  onModuleDelete,
  onLessonDelete,
  onLessonToggle,
  onVideoUpload,
  onVideoRemove,
}: ConteudoTabProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Módulos e Aulas</CardTitle>
          <Button onClick={onModuleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Módulo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="space-y-4">
          {curso.modulos.map((modulo, moduloIndex) => (
            <ModuloItem
              key={modulo.id}
              modulo={modulo}
              moduloIndex={moduloIndex}
              aulasExpandida={aulasExpandida}
              onModuleUpdate={onModuleUpdate}
              onLessonUpdate={onLessonUpdate}
              onLessonAdd={onLessonAdd}
              onModuleDelete={onModuleDelete}
              onLessonDelete={onLessonDelete}
              onLessonToggle={onLessonToggle}
              onVideoUpload={onVideoUpload}
              onVideoRemove={onVideoRemove}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};