import { AxiosError } from 'axios'
import { api } from '../api/config'

interface LoginCredentials {
  email: string
  password: string
}

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
  if (error instanceof AxiosError) {
    const message = (error.response?.data as ApiErrorResponse | undefined)?.message

    if (Array.isArray(message)) return message.join('. ')
    if (message) return message
    if (error.request) return 'Não foi possível conectar ao servidor. Tente novamente em instantes.'
  }

  return 'Não foi possível entrar. Tente novamente.'
}
