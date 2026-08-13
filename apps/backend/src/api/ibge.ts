import axios from "axios";

export const ibgeApi = axios.create({
  baseURL: "https://apisidra.ibge.gov.br/values",
  timeout: 20_000,
  headers: {
    Accept: "application/json",
  },
});
