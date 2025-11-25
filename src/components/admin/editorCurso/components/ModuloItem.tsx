// src/components/admin/course-editor/Components/ModuleItem.tsx
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { Modulo, Aula } from "@/types/curso";
import { AulaItem } from "./AulaItem";
import { Textarea } from "@/components/ui/textarea";

interface ModuloItemProps {
  modulo: Modulo;
  moduloIndex: number;
  aulasExpandida: Set<number>;
  onModuleUpdate: (moduloId: number, field: keyof Modulo, value: string) => void;
  onLessonUpdate: (moduloId: number, aulaId: number, field: keyof Aula, value: any) => void;
  onLessonAdd: (moduloId: number) => void;
  onModuleDelete: (moduloId: number) => void;
  onLessonDelete: (moduloId: number, aulaId: number) => void;
  onLessonToggle: (aulaId: number) => void;
  onVideoUpload: (moduloId: number, aulaId: number, file: File) => void;
  onVideoRemove: (moduloId: number, aulaId: number) => void;
}

export const ModuloItem = ({
  modulo,
  moduloIndex,
  aulasExpandida,
  onModuleUpdate,
  onLessonUpdate,
  onLessonAdd,
  onModuleDelete,
  onLessonDelete,
  onLessonToggle,
  onVideoUpload,
  onVideoRemove,
}: ModuloItemProps) => {
  return (
    <AccordionItem key={modulo.id} value={`modulo-${modulo.id}`} className="border rounded-lg">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              {moduloIndex + 1}
            </div>
            <div className="text-left">
              <h3 className="font-medium">{modulo.titulo}</h3>
              <p className="text-sm text-muted-foreground">{modulo.aulas.length} aulas</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onModuleDelete(modulo.id);
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          {/* Editar informações do módulo */}
          <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="space-y-2">
              <Label>Título do Módulo</Label>
              <Input
                value={modulo.titulo}
                onChange={(e) => onModuleUpdate(modulo.id, "titulo", e.target.value)}
                className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição do Módulo</Label>
              <Textarea
                value={modulo.descricao}
                onChange={(e) => onModuleUpdate(modulo.id, "descricao", e.target.value)}
                className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                rows={3}
              />
              {/* // <Input
              //   value={modulo.descricao}
              //   onChange={(e) => onModuleUpdate(modulo.id, "descricao", e.target.value)}
              //   className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              // /> */}
            </div>
          </div>

          {/* Lista de aulas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Aulas</h4>
              <Button variant="outline" size="sm" onClick={() => onLessonAdd(modulo.id)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Aula
              </Button>
            </div>

            {modulo.aulas.map((aula) => (
              <AulaItem
                key={aula.id}
                moduloId={modulo.id}
                aula={aula}
                isExpanded={aulasExpandida.has(aula.id)}
                onToggle={() => onLessonToggle(aula.id)}
                onUpdate={(field, value) => onLessonUpdate(modulo.id, aula.id, field, value)}
                onDelete={() => onLessonDelete(modulo.id, aula.id)}
                onVideoUpload={(file) => onVideoUpload(modulo.id, aula.id, file)}
                onVideoRemove={() => onVideoRemove(modulo.id, aula.id)}
              />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};