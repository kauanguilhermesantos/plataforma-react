import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Curso } from "@/types/curso"

interface DeleteCursoDialogProps {
  curso: Curso | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: () => void
}

export function DeleteCourseDialog({ 
  curso, 
  open, 
  onOpenChange, 
  onConfirm 
}: DeleteCursoDialogProps) {
  
  const handleConfirm = () => {
    // Aqui você faria a chamada API real para deletar
    console.log(`Curso ${curso?.titulo} será excluído`)
    if (onConfirm) {
      onConfirm()
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Curso</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o curso <strong>{curso?.titulo}</strong>? 
            Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}