import { AuthTabs } from "@/components/auth/auth-tabs";
import Link from "next/link";

export default function AuthPage() {
  return(
    // div main
    <div className="border border-red-950 container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* div esquerda */}
      <div className="border border-red-950 relative hidden h-full flex-col p-10 text-foreground lg:flex">
        {/* div header titulo esquerdo */}
        <div className="border border-red-950 relative z-20 flex items-center justify-between">
          {/* div logo */}
          <div className="border border-red-950 flex items-center gap-2 text-lg font-medium">
            <span className="text-xl font-bold">Projeto</span>
          </div>
          {/* <ThemeToggle /> */}
        </div> 
      </div>

      {/* div direita */}
      <div className="border border-blue-700 lg:p-8">
        {/* div form */}
        <div className="border border-blue-700 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {/* div header form */}
          <div className="border border-blue-700 flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Bem-vindo ao Projeto
              {/* <span className="bg-gradient-to-r from-koda-blue to-koda-green bg-clip-text text-transparent">Projeto</span> */}
            </h1>
            <p className="text-sm text-muted-foreground">
              Entre com sua conta ou crie uma nova para começar sua jornada de aprendizado
            </p>
          </div>

          <div className="border border-blue-700 koda-card p-1">
            <AuthTabs />
          </div>

          <p className="border border-blue-700 px-8 text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}