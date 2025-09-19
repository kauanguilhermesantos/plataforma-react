import { CategoriaCatalogo } from '@/types/catalogo'
import { BookOpen, Brain, Code, Database, Globe, Palette, Shield, Smartphone } from 'lucide-react'

export const categoriasCatalogo: CategoriaCatalogo[] = [
  { value: "all", label: "Todas as Categorias", icon: BookOpen },
  { value: "Programação", label: "Programação", icon: Code },
  { value: "Design", label: "Design", icon: Palette },
  { value: "Data Science", label: "Data Science", icon: Database },
  { value: "Mobile", label: "Mobile", icon: Smartphone },
  { value: "Web", label: "Desenvolvimento Web", icon: Globe },
  { value: "IA", label: "Inteligência Artificial", icon: Brain },
  { value: "Segurança", label: "Cibersegurança", icon: Shield },
]