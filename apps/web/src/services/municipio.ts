import { api } from "@/api/config"

export async function municipio() {
  const  response  = await api.get('/municipios/todos')
  console.log('municipio', response.data)

  return response.data
}