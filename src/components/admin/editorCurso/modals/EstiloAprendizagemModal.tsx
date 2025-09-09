// src/components/admin/course-editor/Modals/LearningStylesModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EstiloAprendizagemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EstiloAprendizagemModal = ({ open, onOpenChange }: EstiloAprendizagemModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-blue-600 dark:text-blue-400">Estilos de Aprendizagem</DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-300">
            Entenda as características de cada estilo de aprendizagem para escolher o mais adequado ao seu curso.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">🎯 Pragmático</h3>
            <p className="text-sm text-justify text-slate-600 dark:text-slate-300">
              Focado na aplicação prática do conhecimento. Prefere aprender através de exemplos reais, estudos de caso
              e exercícios práticos. Ideal para cursos que enfatizam a implementação e uso imediato das habilidades
              aprendidas.
            </p>
          </div>

          <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">📚 Teórico</h3>
            <p className="text-sm text-justify text-slate-600 dark:text-slate-300">
              Valoriza a compreensão deep dos conceitos e princípios fundamentais. Prefere explicações detalhadas,
              modelos conceituais e a lógica por trás das práticas. Ideal para cursos com forte base conceitual e
              científica.
            </p>
          </div>

          <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">⚡ Ativista</h3>
            <p className="text-sm text-justify text-slate-600 dark:text-slate-300">
              Aprende melhor através da experiência direta e participação ativa. Prefere atividades hands-on, projetos
              colaborativos e experimentação. Ideal para cursos interativos com muita prática e experimentação.
            </p>
          </div>

          <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">🤔 Reflexivo</h3>
            <p className="text-sm text-justify text-slate-600 dark:text-slate-300">
              Prefere observar e refletir antes de agir. Valoriza o tempo para processar informações e considerar
              diferentes perspectivas. Ideal para cursos que incentivam a análise crítica e a reflexão profunda sobre
              os temas abordados.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Entendi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};