// src/components/admin/course-editor/Components/StatsCards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Play, Clock, Star } from "lucide-react";
import { Curso } from "@/types/curso";
import { calcularTotalHoras } from "@/utils/curso-helpers";

interface StatsCardsProps {
  curso: Curso;
}

export const StatsCards = ({ curso }: StatsCardsProps) => {
  const totalAulas = curso.modulos.reduce((acc, modulo) => acc + modulo.aulas.length, 0);
  const totalHoras = calcularTotalHoras(curso.modulos);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Estudantes</p>
              <p className="text-2xl font-bold">{curso.alunos.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Módulos</p>
              <p className="text-2xl font-bold">{curso.modulos.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Play className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-sm font-medium">Aulas</p>
              <p className="text-2xl font-bold">{totalAulas}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-sm font-medium">Total de Horas</p>
              <p className="text-2xl font-bold">{totalHoras}h</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Avaliação</p>
              <p className="text-2xl font-bold">{curso.avaliacao}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};