import { Check, X } from "lucide-react"

interface PasswordRequirement {
  label: string
  valid: boolean
}

interface PasswordStrengthProps {
  requirements: PasswordRequirement[]
}

export function PasswordStrength({ requirements }: PasswordStrengthProps) {
  return (
    <div className="mt-2 space-y-1">
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center text-xs">
          {req.valid ? (
            <Check className="mr-1 h-3.5 w-3.5 text-koda-green" />
          ) : (
            <X className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span className={req.valid ? "text-koda-green" : "text-muted-foreground"}>{req.label}</span>
        </div>
      ))}
    </div>
  )
}
