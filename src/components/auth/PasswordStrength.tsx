"use client"
import { CheckCircle, X } from "lucide-react"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = [
    { label: "Pelo menos 8 caracteres", test: (pwd: string) => pwd.length >= 8 },
    { label: "Uma letra minúscula", test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: "Uma letra maiúscula", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: "Um número", test: (pwd: string) => /\d/.test(pwd) },
    { label: "Um caractere especial", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ]

  const passedRequirements = requirements.filter((req) => req.test(password))
  const strength = (passedRequirements.length / requirements.length) * 100

  const getStrengthLabel = () => {
    if (strength === 0) return ""
    if (strength <= 40) return "Fraca"
    if (strength <= 60) return "Regular"
    if (strength <= 80) return "Boa"
    return "Forte"
  }

  const getStrengthColor = () => {
    if (strength <= 40) return "bg-red-500"
    if (strength <= 60) return "bg-yellow-500"
    if (strength <= 80) return "bg-blue-500"
    return "bg-green-500"
  }

  if (!password) return null

  return (
    <div className="space-y-3 mt-2">
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Força da senha:</span>
          <span
            className={`font-medium ${
              strength <= 40
                ? "text-red-600"
                : strength <= 60
                  ? "text-yellow-600"
                  : strength <= 80
                    ? "text-blue-600"
                    : "text-green-600"
            }`}
          >
            {getStrengthLabel()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const passed = requirement.test(password)
          return (
            <div key={index} className="flex items-center space-x-2 text-sm">
              {passed ? <CheckCircle className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />}
              <span className={passed ? "text-green-500" : "text-gray-600 dark:text-gray-300"}>{requirement.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
