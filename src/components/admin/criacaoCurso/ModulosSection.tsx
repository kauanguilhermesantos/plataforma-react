// src/components/admin/course-creation/ModulesSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Modulo, Aula } from "@/types/curso";
import { ModuloItem } from "./components/ModuloItem";

interface ModulosSectionProps {
  modulos: Modulo[];
  onModuleAdd: () => void;
  onModuleUpdate: (moduloId: number, field: keyof Modulo, titulo: string) => void;
  onModuleRemove: (moduloId: number) => void;
  onLessonAdd: (moduloId: number) => void;
  onLessonUpdate: (moduloId: number, aulaId: number, field: keyof Aula, value: string) => void;
  onLessonRemove: (moduloId: number, aulaId: number) => void;
  onVideoUpload: (moduloId: number, aulaId: number, file: File) => void;
  onVideoRemove: (moduloId: number, aulaId: number) => void;
}

export const ModulosSection = ({
  modulos,
  onModuleAdd,
  onModuleUpdate,
  onModuleRemove,
  onLessonAdd,
  onLessonUpdate,
  onLessonRemove,
  onVideoUpload,
  onVideoRemove,
}: ModulosSectionProps) => {
  return (
    <Card className="dark:bg-slate-900 dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="dark:text-white">Módulos e Aulas</CardTitle>
        <Button
          type="button"
          onClick={onModuleAdd}
          variant="outline"
          size="sm"
          className="dark:border-slate-700 dark:text-slate-300 bg-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Módulo
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {modulos.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
            <p>Nenhum módulo adicionado ainda</p>
            <p className="text-sm mt-1">Clique em "Adicionar Módulo" para começar</p>
          </div>
        ) : (
          <>
            {modulos.map((modulo, moduloIndex) => (
              <ModuloItem
                key={modulo.id}
                modulo={modulo}
                moduloIndex={moduloIndex}
                onModuleUpdate={onModuleUpdate}
                onModuleRemove={onModuleRemove}
                onLessonAdd={onLessonAdd}
                onLessonUpdate={onLessonUpdate}
                onLessonRemove={onLessonRemove}
                onVideoUpload={onVideoUpload}
                onVideoRemove={onVideoRemove}
              />
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};