// src/components/admin/course-editor/Modals/PublishModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PublishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPublished: boolean;
  onConfirm: () => void;
}

export const PublishModal = ({ open, onOpenChange, isPublished, onConfirm }: PublishModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isPublished ? "Despublicar Curso" : "Publicar Curso"}</DialogTitle>
          <DialogDescription>
            {isPublished
              ? "Tem certeza que deseja despublicar este curso? Ele ficará invisível para os estudantes até ser publicado novamente."
              : "Tem certeza que deseja publicar este curso? Ele ficará visível para todos os estudantes na plataforma."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>{isPublished ? "Despublicar" : "Publicar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};