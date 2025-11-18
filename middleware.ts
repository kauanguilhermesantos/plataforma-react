import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Se o usuário NÃO está logado e tenta acessar rotas protegidas
  if (!token && (pathname.startsWith('/home') || pathname.startsWith('/admin') || pathname.startsWith('/meuPerfil'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se o usuário ESTÁ logado e tenta acessar login
  if (token && pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home/:path*', 
    '/meuPerfil/:path*', 
    '/admin/:path*',
    '/login'
  ]
}