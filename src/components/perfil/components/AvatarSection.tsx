import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, Upload } from "lucide-react"
import { useRef } from "react"

interface AvatarSectionProps {
  avatar: string
  primeiroNome: string
  ultimoNome: string
  onAvatarChange: (file: File) => void
  isUploading?: boolean
}

export function AvatarSection({ avatar, primeiroNome, ultimoNome, onAvatarChange, isUploading = false }: AvatarSectionProps) {

  // UseRef para o input de arquivo oculto
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Função para lidar com o clique no botão de alterar foto
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar o tipo e tamanho do arquivo
      const tiposValidos = ['image/jpeg', 'image/png'];

      if (!tiposValidos.includes(file.type)) {
        alert('Tipo de arquivo inválido. Por favor, selecione um arquivo JPG ou PNG.');
        return;
      }

      // Verificar tamanho do arquivo (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('O tamanho do arquivo excede o limite de 10MB.');
        return;
      }

      // Chamar a função de callback com o arquivo selecionado
      onAvatarChange(file);
    
      // Limpar o input para permitir selecionar o mesmo arquivo novamente, se necessário
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }



  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatar} alt={primeiroNome} key={avatar} />
        <AvatarFallback className="text-lg">
          {primeiroNome?.[0] || ""}
          {ultimoNome?.[0] || ""}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png"
          className="hidden"
        />
        <Button variant="outline" size="sm" onClick={handleButtonClick} disabled={isUploading}>
          {isUploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-pulse" />
              Carregando...
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" />
              Alterar Foto
            </>
          )}
        </Button>
        <p className="text-sm text-gray-500">JPG, PNG ou GIF. Máximo 10MB.</p>
      </div>
    </div>
  )
}