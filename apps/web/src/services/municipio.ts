import { api } from "@/api/config"

export async function Allmunicipios() {
  const  response  = await api.get('/municipios/todos')
  console.log('municipio', response.data)

  return response.data
}

export async function municipios() {
  const  response  = await api.get('/municipios')
  console.log('municipio', response.data)

  return response.data
}

export async function regioes() {
  const  response  = await api.get('/municipios/regioes-imediatas')
  console.log('municipio', response.data)

  return response.data
}