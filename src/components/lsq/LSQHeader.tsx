import { ClipboardList } from "lucide-react"

interface LSQHeaderProps {
  titulo: string
  subtitulo: string
}

export function LSQHeader({ titulo, subtitulo }: LSQHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-full">
          <ClipboardList className="h-8 w-8 text-white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {titulo}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">{subtitulo}</p>
    </div>
  )
}