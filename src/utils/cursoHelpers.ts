// src/components/admin/course-editor/utils/course-helpers.ts
import { Modulo } from '@/types/curso';

export const calcularTotalHoras = (modulos: Modulo[]): number => {
  const totalMinutos = modulos.reduce((acc, modulo) => {
    return acc + modulo.aulas.reduce((aulaAcc, aula) => {
      if (aula.duracao) {
        const [minutos, segundos] = aula.duracao.split(":").map(Number);
        return aulaAcc + minutos + segundos / 60;
      }
      return aulaAcc;
    }, 0);
  }, 0);
  return Math.round((totalMinutos / 60) * 10) / 10;
};

export const validarFile = (file: File, options: { maxSize: number; allowedTypes: string[] }): boolean => {
  if (!options.allowedTypes.some(type => file.type.startsWith(type))) {
    return false;
  }
  if (file.size > options.maxSize) {
    return false;
  }
  return true;
};

export const gerarModuloId = (): number => {
  return Date.now();
};

export const gerarAulaId = (): number => {
  return Date.now();
};

export const gerarRecursoId = (): number => {
  return Date.now();
};