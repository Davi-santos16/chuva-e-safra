import { isAxiosError } from 'axios'
import { api } from '../api/config'
import type { LoginCredentials } from '@/lib/auth/types'

interface LoginResponse {
  token: string
}

interface ApiErrorResponse {
  message?: string | string[]
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials)

  return data
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
