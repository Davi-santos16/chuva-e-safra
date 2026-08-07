export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'PRODUTOR' | 'TECNICO_COOPERATIVA' | 'GESTOR_PUBLICO';
  municipio: string;
}