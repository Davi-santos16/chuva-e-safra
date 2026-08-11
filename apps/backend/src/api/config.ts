import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_DADOS_URL,
  // timeout: 10000,  
  headers: {
    'Content-Type': 'application/json',
  },
});