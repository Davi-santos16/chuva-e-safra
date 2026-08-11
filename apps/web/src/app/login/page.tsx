import type { Metadata } from 'next'
import { Login } from '@/app/components/auth/login'

export const metadata: Metadata = { title: 'Entrar | Chuva & Safra', description: 'Acesso demonstrativo à plataforma Chuva & Safra.' }

export default function LoginPage() { return <Login /> }
