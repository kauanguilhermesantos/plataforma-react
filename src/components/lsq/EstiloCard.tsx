import { CheckCircle } from "lucide-react"
import { EstiloInfo } from "@/types/perguntaLSQ"

interface EstiloCardProps {
  estiloInfo: EstiloInfo
  isDominant?: boolean
}

export function EstiloCard({ estiloInfo, isDominant = false }: EstiloCardProps) {
  const Icon = estiloInfo.icon

  return (
    <div className={`bg-gradient-to-br ${estiloInfo.color} p-8 rounded-2xl shadow-lg ${isDominant ? 'mb-8' : ''}`}>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Icon className="h-12 w-12 text-white" />
        <h2 className="text-4xl font-bold text-white">{estiloInfo.nome}</h2>
      </div>
      <p className="text-white text-center text-lg mb-6">{estiloInfo.descricao}</p>

      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 text-center">
          {isDominant ? 'Características principais:' : 'Características:'}
        </h3>
        <ul className="space-y-2">
          {estiloInfo.caracteristicas.map((char, index) => (
            <li key={index} className="flex items-start text-white">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{char}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}