import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { Curso } from "@/types/curso"

interface UnenrollDialogProps {
  isOpen: boolean
  curso: Curso | null
  isUnenrolling: boolean
  onClose: () => void
  onConfirm: (curso: Curso) => void
}

export function UnenrollDialog({ isOpen, curso, isUnenrolling, onClose, onConfirm }: UnenrollDialogProps) {
  if (!curso) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isUnenrolling && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
            Desinscrever-se do Curso
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja se desinscrever do curso <strong>"{curso.titulo}"</strong>?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Atenção: Esta ação não pode ser desfeita
                </p>
                <ul className="text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Você perderá todo o progresso do curso</li>
                  <li>• Suas anotações e marcações serão removidas</li>
                  <li>• Será necessário se inscrever novamente para acessar o conteúdo</li>
                  {curso.progresso > 0 && (
                    <li>• Seu progresso atual de {curso.progresso}% será perdido</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUnenrolling}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => onConfirm(curso)} disabled={isUnenrolling}>
            {isUnenrolling ? "Desinscrevendo..." : "Sim, Desinscrever"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}