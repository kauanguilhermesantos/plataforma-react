import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'seu-segredo-super-secreto'

export interface DecodedToken {
  usuarioId: string
  email: string
  primeiroNome: string
  ultimoNome: string
  iat?: number
  exp?: number
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken
    return decoded
  } catch (error) {
    console.error('Token inválido:', error)
    return null
  }
}

export function getTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove "Bearer "
}

export async function getToken(request: NextRequest | Request): Promise<DecodedToken | null> {
  try {
    const authHeader = request.headers.get('authorization')
    const token = getTokenFromHeader(authHeader)
    
    if (!token) {
      return null
    }
    
    return verifyToken(token)
  } catch (error) {
    console.error('Erro ao obter token:', error)
    return null
  }
}

export function decodeToken(token: string): { userId: string } | null {
  try {
    // Decodificar token JWT (base64)
    const payload = token.split('.')[1]
    const decodedPayload = JSON.parse(atob(payload))
    return {
      userId: decodedPayload.userId
    }
  } catch (error) {
    console.error('Erro ao decodificar token:', error)
    return null
  }
}

// lib/jwt.ts
export class JWTService {
  static async verifyToken(token: string): Promise<any> {
    try {
      // Aqui você implementaria a verificação real do JWT
      // Por enquanto, vamos simular uma verificação básica
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Token inválido');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  static removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}