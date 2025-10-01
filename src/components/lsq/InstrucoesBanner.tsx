interface InstrucoesBannerProps {
  instrucoes: string
}

export function InstrucoesBanner({ instrucoes }: InstrucoesBannerProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
      <p className="text-sm text-blue-900 dark:text-blue-200">
        <strong>Instruções:</strong> {instrucoes}
      </p>
    </div>
  )
}