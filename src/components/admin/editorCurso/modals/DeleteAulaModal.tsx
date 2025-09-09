// src/components/admin/course-editor/Modals/DeleteLessonModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteAulaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteAulaModal = ({ open, onOpenChange, onConfirm }: DeleteAulaModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão da Aula</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta aula? Esta ação não pode ser desfeita e todo o conteúdo da aula será
            perdido.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir Aula
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};