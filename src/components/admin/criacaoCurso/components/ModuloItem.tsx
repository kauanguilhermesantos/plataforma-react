// src/components/admin/course-creation/Components/ModuleItem.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Play } from "lucide-react";
import { Modulo, Aula } from "@/types/curso";
import { AulaItem } from "./AulaItem";

interface ModuloItemProps {
  modulo: Modulo;
  moduloIndex: number;
  onModuleUpdate: (moduloId: number, field: keyof Modulo, titulo: string) => void;
  onModuleRemove: (moduloId: number) => void;
  onLessonAdd: (moduloId: number) => void;
  onLessonUpdate: (moduloId: number, aulaId: number, field: keyof Aula, value: string) => void;
  onLessonRemove: (moduloId: number, aulaId: number) => void;
  onVideoUpload: (moduloId: number, aulaId: number, file: File) => void;
  onVideoRemove: (moduloId: number, aulaId: number) => void;
}

export const ModuloItem = ({
  modulo,
  moduloIndex,
  onModuleUpdate,
  onModuleRemove,
  onLessonAdd,
  onLessonUpdate,
  onLessonRemove,
  onVideoUpload,
  onVideoRemove,
}: ModuloItemProps) => {
  return (
    <div className="border bg-slate-100 dark:bg-slate-800 dark:border-slate-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            value={modulo.titulo}
            onChange={(e) => onModuleUpdate(modulo.id, "titulo", e.target.value)}
            placeholder={`Módulo ${moduloIndex + 1}: Título do módulo`}
            className="dark:bg-slate-700 border-slate-300 dark:border-slate-700 dark:text-white"
          />
        </div>
        <Button
          type="button"
          onClick={() => onModuleRemove(modulo.id)}
          variant="outline"
          size="sm"
          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white p-1 h-7 w-7"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>

      <div className="ml-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium dark:text-slate-300">Aulas</h4>
          <Button
            type="button"
            onClick={() => onLessonAdd(modulo.id)}
            variant="outline"
            size="sm"
            className="dark:border-slate-700 dark:text-slate-300"
          >
            <Plus className="w-3 h-3 mr-1" />
            Adicionar Aula
          </Button>
        </div>

        {modulo.aulas.length === 0 ? (
          <div className="text-center py-6 text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
            <p>Nenhuma aula adicionada ainda</p>
            <p className="text-sm mt-1">Clique em "Adicionar Aula" para começar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {modulo.aulas.map((aula, aulaIndex) => (
              <AulaItem
                key={aula.id}
                moduloId={modulo.id}
                aula={aula}
                aulaIndex={aulaIndex}
                onLessonUpdate={onLessonUpdate}
                onLessonRemove={onLessonRemove}
                onVideoUpload={onVideoUpload}
                onVideoRemove={onVideoRemove}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};