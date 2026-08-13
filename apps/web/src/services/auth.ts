import { isAxiosError } from 'axios'
import { api } from '../api/config'
import type { AuthUser, LoginCredentials } from '@/lib/auth/types'

interface LoginResponse {
  token: string
}

interface MeResponse {
  user: AuthUser
}

interface ApiErrorResponse {
  message?: string | string[]
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials)

  return data
}

export async function getCurrentUser(): Promise<AuthUser> {
  const { data } = await api.get<MeResponse>('/me')

  return data.user
}

export function getLoginErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const message = (error.response?.data as ApiErrorResponse | undefined)?.message

    if (Array.isArray(message)) return message.join('. ')
    if (message) return message
    if (error.request) return 'Não foi possível conectar ao servidor. Tente novamente em instantes.'
  }

  if (error instanceof Error && error.message === 'A sessão recebida é inválida ou expirou.') {
    return error.message
  }

  return 'Não foi possível entrar. Tente novamente.'
}
