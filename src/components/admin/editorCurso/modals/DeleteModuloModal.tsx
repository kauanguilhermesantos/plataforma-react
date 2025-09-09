// src/components/admin/course-editor/Modals/DeleteModuleModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteModuloModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteModuloModal = ({ open, onOpenChange, onConfirm }: DeleteModuloModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão do Módulo</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este módulo? Esta ação não pode ser desfeita e todas as aulas do módulo
            também serão removidas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir Módulo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};