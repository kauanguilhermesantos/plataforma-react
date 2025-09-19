interface CatalogoHeaderProps {
  titulo: string
  descricao: string
}

export function CatalogoHeader({ titulo, descricao }: CatalogoHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{titulo}</h1>
      <p className="text-gray-600 dark:text-gray-400">{descricao}</p>
    </div>
  )
}