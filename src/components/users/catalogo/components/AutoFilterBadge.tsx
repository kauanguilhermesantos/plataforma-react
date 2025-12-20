import { Badge } from "@/components/ui/badge"
import { X, Sparkles, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EstiloInfo } from "@/types/perguntaLSQ"

interface AutoFilterBadgeProps {
  estiloUsuario: string
  onRemove: () => void
  autoFilterApplied: boolean
  estiloInfo?: EstiloInfo | null
}

export function AutoFilterBadge({ 
  estiloUsuario, 
  onRemove, 
  autoFilterApplied,
  estiloInfo 
}: AutoFilterBadgeProps) {
  if (!autoFilterApplied) return null

  // Usar cores do estiloInfo se disponível
  const bgColor = estiloInfo?.bgColor || "bg-blue-100/20"
  const textColor = estiloInfo?.textColor || "text-blue-700"
  const borderColor = estiloInfo?.borderColor || "border-blue-200"
  const IconComponent = estiloInfo?.icon || Sparkles

  return (
    <div className={`flex items-center gap-3 p-4 ${bgColor} border ${borderColor} rounded-lg`}>
      <div className="flex-shrink-0">
        <div className={`p-2 ${bgColor.replace('/20', '/50')} rounded-full`}>
          <IconComponent className={`h-5 w-5 ${textColor}`} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className={`text-sm font-medium ${textColor} dark:text-blue-100`}>
            Filtro personalizado ativo
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-blue-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Baseado no seu estilo de aprendizagem identificado no perfil.
                  Cursos filtrados para melhor adequação ao seu modo de aprender.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className={`text-sm ${textColor} dark:text-blue-300`}>
          Mostrando cursos recomendados para{" "}
          <Badge 
            variant="secondary" 
            className={`ml-1 ${bgColor} ${textColor} border ${borderColor}`}
          >
            {estiloUsuario}
          </Badge>
        </p>
        {estiloInfo?.descricao && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {estiloInfo.descricao}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className={`${textColor} hover:opacity-80 hover:${bgColor.replace('/20', '/30')}`}
      >
        <X className="h-4 w-4 mr-1" />
        Remover
      </Button>
    </div>
  )
}