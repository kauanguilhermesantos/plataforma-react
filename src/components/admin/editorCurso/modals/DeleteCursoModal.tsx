// src/components/admin/course-editor/Modals/DeleteCourseModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteCursoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle: string;
  onConfirm: () => void;
}

export const DeleteCursoModal = ({ open, onOpenChange, courseTitle, onConfirm }: DeleteCursoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Curso Permanentemente</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Tem certeza que deseja excluir permanentemente o curso "{courseTitle}"?
            Todos os dados, módulos, aulas e recursos serão perdidos para sempre.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir Permanentemente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};