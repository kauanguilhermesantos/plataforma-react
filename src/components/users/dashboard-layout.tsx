"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GraduationCap, Menu, Home, BookOpen, Settings, LogOut, Bell, Search, User, CircleQuestionMark } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { usePathname } from "next/navigation"
import { Badge } from "../ui/badge"
import { estiloInfo } from "@/data/mockLSQ"
import { useAuth } from "@/hooks/useAuth"
import { mockUsuario } from "@/data/mockUsuario"
import { Separator } from "../ui/separator"
import { usePerfil } from "@/hooks/usePerfil"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  const { logout } = useAuth();

  const { userData } = usePerfil();
  const usuario = userData

  // Obter o estilo de aprendizagem
  const estiloAprendizagemInfo = usuario?.estiloAprendizagem ? estiloInfo[usuario.estiloAprendizagem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() as keyof typeof estiloInfo] : null;
  const EstiloIcon = estiloAprendizagemInfo ? estiloAprendizagemInfo.icon : CircleQuestionMark;
  
  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/home" },
    { icon: BookOpen, label: "Meus Cursos", href: "/meusCursos" },
    { icon: Search, label: "Catálogo", href: "/catalogo" },
    { icon: User, label: "Meu Perfil", href: "/meuPerfil" },
  ]

  const handleLogout = async () => {
    try {
      console.log("Iniciando logout...");
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      window.location.href = '/login';
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo e Menu Mobile */}
          <div className="flex items-center gap-4">
            {/* Botão toggle sidebar desktop */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <MobileNavigation 
                  items={navigationItems} 
                  usuario={usuario} 
                  pathname={pathname || ""} 
                  onLogout={handleLogout} 
                  estiloAprendizagemInfo={estiloAprendizagemInfo}
                  EstiloIcon={EstiloIcon}  
                />
              </SheetContent>
            </Sheet>

            <Link href="/home" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">Koda</span>
            </Link>
          </div>

          {/* Ações do Header */}
          <div className="flex items-center gap-3">
            {/* Botão do Tema */}
            <ThemeToggle />

            {/* Menu do Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={usuario?.avatar} alt={usuario?.primeiroNome} />
                    <AvatarFallback>
                      {usuario?.primeiroNome?.[0] || ""}
                      {usuario?.ultimoNome?.[0] || ""}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{usuario?.primeiroNome} {usuario?.ultimoNome}</p>
                    <p className="text-xs leading-none text-muted-foreground">{usuario?.email}</p>
                    {estiloAprendizagemInfo && (
                      <Badge className={`w-fit text-xs ${estiloAprendizagemInfo.bgColor} ${estiloAprendizagemInfo.textColor} ${estiloAprendizagemInfo.borderColor} flex items-center gap-1.5`}>
                        <EstiloIcon className="h-3 w-3" />
                        {estiloAprendizagemInfo.nome}
                      </Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/meuPerfil" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Meu Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Desktop */}
        {isSidebarOpen && (
          <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 transition-all duration-300">
            <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        pathname === item.href
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Logout Button */}
                <div className="px-2 pb-2">
                  <button
                    onClick={handleLogout}
                    className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Conteúdo Principal */}
        <main className={`${isSidebarOpen ? "lg:pl-64" : "lg:pl-0"} flex flex-col flex-1 transition-all duration-300`}>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

function MobileNavigation({
  items,
  usuario,
  pathname,
  onLogout,
  estiloAprendizagemInfo,
  EstiloIcon
}: { items: any[]; usuario: any; pathname: string; onLogout: () => void, estiloAprendizagemInfo, EstiloIcon }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="bg-blue-600 p-2 rounded-lg">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <span className="font-bold text-xl text-gray-900 dark:text-white">Koda</span>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              pathname === item.href
                ? "bg-blue-100 text-blue-900"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Link href={"/meuPerfil"}>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={usuario.avatar} alt={usuario?.primeiroNome} />
              <AvatarFallback>
                {usuario?.primeiroNome?.[0] || ""}
                {usuario?.ultimoNome?.[0] || ""}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-300 truncate">{usuario?.primeiroNome} {usuario?.ultimoNome}</p>
              <p className="text-xs text-gray-500 truncate">{usuario?.email}</p>
            </div>
          </div>
        </Link>


      </div>
        <Separator/>
        
        {/* Logout Button Mobile */}
        <button
          onClick={onLogout}
          className="group flex items-center w-full p-4 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </button>
    </div>
  )
}
