"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import {
  ArrowRight,
  CheckCircle,
  Code,
  Brain,
  Target,
  Lightbulb,
  Menu,
  X,
  Zap,
  Clock,
  Award,
  Rocket,
} from "lucide-react"

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const estilosAprendizagem = [
    {
      titulo: "Ativista",
      descricao: "Aprenda fazendo! Projetos práticos e hands-on desde o primeiro dia.",
      icon: <Target className="h-8 w-8" />,
      color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
      hoverTitulo: "group-hover:text-red-600 dark:group-hover:text-red-400",
      bgHover: "group-hover:bg-red-50 dark:group-hover:bg-red-900",
      features: ["Projetos práticos", "Coding challenges", "Hackathons virtuais"],
    },
    {
      titulo: "Pragmático",
      descricao: "Foque no que realmente importa. Técnicas aplicáveis ao mundo real.",
      icon: <Code className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      hoverTitulo: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      bgHover: "group-hover:bg-blue-50 dark:group-hover:bg-blue-900",
      features: ["Casos reais", "Ferramentas do mercado", "Metodologias ágeis"],
    },
    {
      titulo: "Reflexivo",
      descricao: "Analise e compreenda profundamente cada conceito antes de avançar.",
      icon: <Brain className="h-8 w-8" />,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      hoverTitulo: "group-hover:text-green-600 dark:group-hover:text-green-400",
      bgHover: "group-hover:bg-green-50 dark:group-hover:bg-green-900",
      features: ["Análise detalhada", "Estudos de caso", "Tempo para reflexão"],
    },
    {
      titulo: "Teórico",
      descricao: "Construa uma base sólida com fundamentos e conceitos estruturados.",
      icon: <Lightbulb className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      hoverTitulo: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      bgHover: "group-hover:bg-purple-50 dark:group-hover:bg-purple-900",
      features: ["Fundamentos sólidos", "Teoria estruturada", "Conceitos avançados"],
    },
  ]

  const benefits = [
    {
      icon: <Zap className="h-12 w-12 text-yellow-500" />,
      title: "Aprendizado Personalizado",
      description: "Metodologia adaptada ao seu perfil único de aprendizagem para máxima eficiência",
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-500" />,
      title: "Flexibilidade Total",
      description: "Estude no seu ritmo, quando e onde quiser, com conteúdo sempre disponível",
    },
    {
      icon: <Award className="h-12 w-12 text-green-500" />,
      title: "Certificação",
      description: "Comprove suas habilidades com certificados oficiais ao concluir cada curso",
    },
    {
      icon: <Rocket className="h-12 w-12 text-purple-500" />,
      title: "Transformação Profissional",
      description:
        "Desenvolva as habilidades mais demandadas pelo mercado e construa uma carreira sólida em tecnologia",
    },
  ]

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault()
        const element = document.getElementById(targetId)
        if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        }
        setIsMenuOpen(false) // Fecha o menu mobile depois de clicar
    }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Koda
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#beneficios"
                onClick={(e) => handleNavClick(e, "beneficios")}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Benefícios
              </a>
              <a
                href="#estilos"
                onClick={(e) => handleNavClick(e, "estilos")}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Estilos de Aprendizagem
              </a>
              <a
                href="#como-funciona"
                onClick={(e) => handleNavClick(e, "como-funciona")}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Como Funciona
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/cadastro">
                <Button>Começar Agora</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <a
                    href="#beneficios"
                    onClick={(e) => handleNavClick(e, "beneficios")}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Benefícios
                  </a>
                  <a
                    href="#estilos"
                    onClick={(e) => handleNavClick(e, "estilos")}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Estilos de Aprendizagem
                  </a>
                  <a
                    href="#como-funciona"
                    onClick={(e) => handleNavClick(e, "como-funciona")}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Como Funciona
                  </a>
                </div>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/login">
                    <Button variant="secondary" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/cadastro">
                    <Button className="w-full">Começar Agora</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              🚀 Nova Era do Ensino de Programação
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Aprenda Programação do{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Seu Jeito
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A primeira plataforma educacional que adapta o ensino de programação ao seu estilo de aprendizagem. Seja
              ativista, pragmático, reflexivo ou teórico - temos o método perfeito para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/cadastro">
                <Button size="lg" className="text-lg px-8">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por Que Escolher a Koda?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra os benefícios únicos que fazem da Koda a melhor escolha para sua jornada de aprendizado
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg  hover:shadow-xl hover:shadow-blue-200 hover:dark:shadow-blue-900 transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Estilos de Apredizagem Section */}
      <section id="estilos" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Quatro Estilos, Uma Plataforma</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra seu estilo de aprendizagem e acelere seu desenvolvimento com métodos personalizados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {estilosAprendizagem.map((estilo, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 ${estilo.bgHover[index]}`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${
                      index === 0
                        ? "#ef4444" 
                        :
                          index === 1
                          ? "#3b82f6" 
                          :
                            index === 2
                            ? "#10b981" 
                            : "#8b5cf6"
                      }, transparent)`,                  
                  }}
                />

                <CardHeader className="relative z-10 pb-4">
                  <div
                    className={`w-20 h-20 rounded-2xl ${estilo.color} flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {estilo.icon}
                  </div>
                  <CardTitle className={`text-2xl text-center mb-3 ${estilo.hoverTitulo} transition-colors duration-300`}>
                    {estilo.titulo}
                  </CardTitle>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {estilo.descricao}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  <div className="space-y-3">
                    {estilo.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center text-sm group-hover:translate-x-1 transition-transform duration-300"
                        style={{ transitionDelay: `${featureIndex * 50}ms` }}
                      >
                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e eficaz para descobrir seu estilo e acelerar seu aprendizado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Descubra Seu Estilo</h3>
              <p className="text-muted-foreground">
                Faça nosso teste personalizado e descubra se você é ativista, pragmático, reflexivo ou teórico
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Encontre Conteúdo Personalizado</h3>
              <p className="text-muted-foreground">
                Nossa plataforma recomenda os cursos conforme o seu estilo de aprendizagem
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Acelere Seu Progresso</h3>
              <p className="text-muted-foreground">
                Aprenda mais rápido e com maior retenção usando métodos que realmente funcionam para você
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Metodologia Cientificamente Comprovada</h3>
              <p className="text-muted-foreground mb-6">
                Baseada na teoria de estilos de aprendizagem de Kolb e Honey-Mumford, nossa abordagem é validada por
                pesquisas acadêmicas.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  Teoria de Kolb
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Honey-Mumford
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Neurociência
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Pronto Para Transformar Sua Carreira?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Junte-se a milhares de desenvolvedores que já descobriram seu potencial com a Koda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/cadastro">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Começar Agora - É Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  Koda
                </span>
              </div>
              <p className="text-muted-foreground">
                A plataforma que revoluciona o ensino de programação através dos estilos de aprendizagem.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Projetos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Comunidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Certificações
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Termos
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Licenças
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Koda. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
