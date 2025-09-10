// src/components/admin/course-creation/Modals/DeleteConfirmationModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmacaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteConfirmacaoModal = ({
  open,
  onOpenChange,
  onConfirm,
}: DeleteConfirmacaoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-red-600 dark:text-red-400">Confirmar Exclusão</DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-300">
            Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita e todos os dados do curso serão
            perdidos permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 bg-transparent"
          >
            Cancelar
          </Button>
          <Button type="button" onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir Curso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};