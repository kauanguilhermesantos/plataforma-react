import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Usuario } from "@/types/perfil"

interface InfoPessoalFormProps {
  usuario: Usuario
  onUserDataChange: (data: Usuario) => void
}

export function InfoPessoalForm({ usuario, onUserDataChange }: InfoPessoalFormProps) {
  
  console.log("Renderizando InfoPessoalForm com dados do usuário:", usuario)
  
  const handleChange = (field: keyof Usuario, value: string) => {
    onUserDataChange({
      ...usuario,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input
            id="firstName"
            value={usuario.primeiroNome}
            onChange={(e) => handleChange("primeiroNome", e.target.value)}
            placeholder="Seu nome"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            id="lastName"
            value={usuario.ultimoNome}
            onChange={(e) => handleChange("ultimoNome", e.target.value)}
            placeholder="Seu sobrenome"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={usuario.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={usuario.telefone}
            onChange={(e) => handleChange("telefone", e.target.value)}
            placeholder="+55 (11) 99999-9999"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            value={usuario.localizacao}
            onChange={(e) => handleChange("localizacao", e.target.value)}
            placeholder="Cidade, Estado"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Input
            id="birthDate"
            type="date"
            value={usuario.dataNascimento}
            onChange={(e) => handleChange("dataNascimento", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Biografia</Label>
        <Textarea
          id="bio"
          placeholder="Conte um pouco sobre você..."
          value={usuario.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          rows={4}
          maxLength={500}
        />
        {/* <p className="text-sm text-gray-500">{usuario.bio.length}/500 caracteres</p> */}
        <p className="text-sm text-gray-500">0/500 caracteres</p>
      </div>
    </div>
  )
}