import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

interface SuccessAlertProps {
  message: string
  type?: "success" | "warning" | "error"
}

export function SuccessAlert({ message, type = "success" }: SuccessAlertProps) {
  const alertStyles = {
    success: "border-green-200 bg-green-50 dark:bg-green-900/20",
    warning: "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20",
    error: "border-red-200 bg-red-50 dark:bg-red-900/20"
  }

  const iconStyles = {
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600"
  }

  return (
    <Alert className={alertStyles[type]}>
      <CheckCircle className={`h-4 w-4 ${iconStyles[type]}`} />
      <AlertDescription className={
        type === "success" ? "text-green-800 dark:text-green-200" :
        type === "warning" ? "text-yellow-800 dark:text-yellow-200" :
        "text-red-800 dark:text-red-200"
      }>
        {message}
      </AlertDescription>
    </Alert>
  )
}