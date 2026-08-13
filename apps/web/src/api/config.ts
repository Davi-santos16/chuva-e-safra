import axios from "axios"
import { AUTH_TOKEN_KEY } from "@/lib/auth/token"

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333",

  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})
