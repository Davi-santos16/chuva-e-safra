# Chuva e Safra

Aplicação web organizada como um **monorepo**, com frontend e backend no mesmo repositório.

## Tecnologias

- **Frontend:** Next.js, React, TypeScript e Tailwind CSS
- **Backend:** Node.js, Express e TypeScript
- **Banco de dados:** PostgreSQL com Prisma ORM
- **Gerenciador de pacotes:** npm workspaces

## Estrutura do projeto

```text
chuva-e-safra/
├── apps/
│   ├── web/          # Aplicação web em Next.js
│   └── backend/      # API Express e configuração do Prisma
├── package.json      # Comandos e workspaces do projeto
└── package-lock.json # Versões das dependências
```

## Pré-requisitos

- Node.js `20.19.x` ou `22.12` (ou superior)
- npm
- Acesso ao projeto Supabase usado pela aplicação

## Instalação

Depois de clonar o repositório, entre na **raiz do projeto** e instale as dependências:

```bash
cd chuva-e-safra
npm install
```

> **Importante:** para preparar o projeto pela primeira vez, prefira executar `npm install` na raiz. O npm workspace instalará as dependências do frontend e do backend. Ao adicionar uma biblioteca, instale-a no workspace em que ela será usada para não registrá-la no `package.json` errado.

### Como adicionar uma nova biblioteca

Você pode instalar a biblioteca de duas maneiras.

Pela raiz, indicando o workspace:

```bash
# Biblioteca usada no frontend
npm install nome-do-pacote -w web

# Biblioteca usada no backend
npm install nome-do-pacote -w backend

# Ferramenta usada apenas na raiz do monorepo
npm install -D nome-do-pacote
```

Ou entrando na pasta da aplicação correta:

```bash
# Frontend (partindo da raiz)
cd apps/web
npm install nome-do-pacote
cd ../..

# Backend (partindo da raiz)
cd apps/backend
npm install nome-do-pacote
cd ../..
```

Nos dois casos, a dependência será registrada no `package.json` do workspace escolhido. Evite instalar uma biblioteca do frontend ou do backend diretamente na raiz sem informar `-w`, pois ela seria registrada no projeto principal.

## Configuração do backend

Crie o arquivo `apps/backend/.env` com as conexões fornecidas pelo Supabase:

```env
DATABASE_URL="postgresql://...URL-do-pooler-do-Supabase..."
DIRECT_URL="postgresql://...URL-direta-do-Supabase..."
API_DADOS_URL="https://...URL-da-API-de-dados..."
JWT_SECRET="...chave-longa-e-aleatoria..."
JWT_EXPIRES_IN="1d"
ADMIN_NAME="Administrador"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="...senha-inicial-com-8-ou-mais-caracteres..."
```

- `DATABASE_URL` é usada pela aplicação e deve apontar para a conexão com pool do Supabase.
- `DIRECT_URL` é usada pelos comandos do Prisma e deve apontar para a conexão direta (ou para o Session Pooler) do Supabase.
- `API_DADOS_URL` é a URL base da API externa de análises.
- `JWT_SECRET` assina e valida os tokens de autenticação e deve ser mantida em segredo.
- `JWT_EXPIRES_IN` define a validade do token; quando omitida, a aplicação usa `1d`.
- `ADMIN_EMAIL` e `ADMIN_PASSWORD` provisionam o primeiro administrador durante a seed. `ADMIN_NAME` é opcional.
- Não envie o arquivo `.env` para o repositório.

Com as variáveis configuradas, gere o Prisma Client:

```bash
cd apps/backend
npx prisma generate
cd ../..
```

O comando deve ser executado em `apps/backend`, onde estão `prisma.config.ts` e a pasta `prisma`. Ele gera o código usado pela aplicação, mas não altera o banco de dados.

Para provisionar o primeiro administrador depois de configurar as variáveis acima:

```bash
cd apps/backend
npx prisma db seed
cd ../..
```

O cadastro público não aceita o perfil `ADMIN`. Depois do primeiro acesso, novos administradores podem ser criados na área protegida `/admin/dashboard`.

### Migrations e banco de produção

O `DIRECT_URL` pode apontar para o banco de produção. Por isso, **não execute `npx prisma migrate dev` usando as credenciais de produção**. Esse comando é destinado somente ao desenvolvimento e deve ser usado com outro projeto Supabase ou com um PostgreSQL local.

Para aplicar migrations já revisadas em produção, use `npx prisma migrate deploy`, preferencialmente pelo processo de deploy/CI. Antes disso, confirme que o histórico de migrations do Prisma está sincronizado com o banco e faça backup dos dados.

Se o banco do Supabase já possuía tabelas antes da adoção do Prisma, não aplique a migration inicial diretamente. Primeiro faça a introspecção do banco e configure um *baseline* das migrations para evitar conflitos ou tentativas de recriar estruturas existentes.

## Executando o projeto

Na raiz do repositório, execute:

```bash
npm run dev
```

Esse comando inicia as duas aplicações ao mesmo tempo:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3333`

Também é possível iniciar cada parte separadamente, sempre pela raiz:

```bash
npm run dev:web
npm run dev:backend
```

## Documentação da API

Com o backend em execução, a documentação interativa Swagger fica disponível em:

- Swagger UI: `http://localhost:3333/docs`
- Especificação OpenAPI em JSON: `http://localhost:3333/docs.json`

Na interface Swagger, cadastre um usuário, faça login, copie o token retornado e
use o botão **Authorize** para testar a rota protegida de análises. Informe apenas
o token; o prefixo `Bearer` é adicionado automaticamente.

## Como o projeto funciona

O frontend, localizado em `apps/web`, contém a interface e as rotas do Next.js. O backend, em `apps/backend`, disponibiliza a API e acessa o PostgreSQL por meio do Prisma. Os modelos e migrations do banco ficam em `apps/backend/prisma`.

O backend inicia o servidor Express na porta `3333` e atualmente disponibiliza o cadastro de usuários em `POST /auth/register`.
