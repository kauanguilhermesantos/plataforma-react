import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Trash2 } from "lucide-react"
import { useState } from "react"

interface DangerZoneProps {
  isLoading: boolean
  onDeleteAccount: () => void
}

export function DangerZone({ isLoading, onDeleteAccount }: DangerZoneProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <Card className="border-red-200 dark:border-red-800">
      <CardHeader>
        <CardTitle className="text-red-600 dark:text-red-400">Zona de Perigo</CardTitle>
        <CardDescription>Ações irreversíveis da conta</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Deletar Conta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Deletar Conta Permanentemente
              </DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. Todos os seus dados, cursos e progresso serão perdidos
                permanentemente. Tem certeza que deseja continuar?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  onDeleteAccount()
                  setShowDeleteDialog(false)
                }} 
                disabled={isLoading}
              >
                {isLoading ? "Deletando..." : "Sim, Deletar Conta"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}