<div align="center">
  <img src="./apps/web/public/logos/logo-horizontal-light.svg" alt="Chuva & Safra" width="240" />

  <h1>Configuração e desenvolvimento</h1>

  <p>Guia técnico para preparar, executar e manter o monorepo Chuva & Safra.</p>

  <p><a href="./README.md">← Voltar para a apresentação do projeto</a></p>
</div>

---

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Estrutura do monorepo](#estrutura-do-monorepo)
- [Instalação](#instalação)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Banco de dados](#banco-de-dados)
- [Tabelas e relacionamentos](#tabelas-e-relacionamentos)
- [Seed](#seed)
- [Execução local](#execução-local)
- [Scripts disponíveis](#scripts-disponíveis)
- [Build de produção](#build-de-produção)
- [Configuração dos serviços](#configuração-dos-serviços)
- [Solução de problemas](#solução-de-problemas)

## Pré-requisitos

Antes de começar, instale:

- [Node.js 20 ou superior](https://nodejs.org/)
- npm, incluído na instalação do Node.js
- Uma instância PostgreSQL ou um projeto no [Supabase](https://supabase.com/)
- Git

Confira o ambiente:

```bash
node --version
npm --version
git --version
```

## Estrutura do monorepo

O projeto utiliza **npm workspaces**. As dependências dos dois aplicativos são
gerenciadas a partir da raiz.

```text
chuva-e-safra/
├── apps/
│   ├── web/                  # Next.js, interface e dashboards
│   └── backend/
│       ├── prisma/
│       │   ├── migrations/  # Histórico versionado do banco
│       │   ├── schema.prisma
│       │   └── seed.ts
│       └── src/              # API Express
├── package.json              # Scripts do monorepo
├── README.md                 # Apresentação do produto
└── TUTORIAL.md               # Este guia técnico
```

## Instalação

Na raiz do repositório, instale todas as dependências:

```bash
npm install
```

Não é necessário executar `npm install` separadamente em `apps/web` e
`apps/backend`.

## Variáveis de ambiente

### Backend

Crie o arquivo local a partir do modelo versionado:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Preencha `apps/backend/.env`:

```dotenv
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://USUARIO:SENHA@HOST:5432/postgres"
API_DADOS_URL="https://endereco-da-api-de-dados"
JWT_SECRET="uma-chave-longa-e-aleatoria"
JWT_EXPIRES_IN="1d"
PORT=3333

ADMIN_NAME="Administrador"
ADMIN_EMAIL="admin@exemplo.com"
ADMIN_PASSWORD="uma-senha-com-no-minimo-8-caracteres"
```

| Variável | Obrigatória | Finalidade |
| --- | :---: | --- |
| `DATABASE_URL` | Sim | Conexão usada pela API durante a execução. No Supabase, pode ser a conexão com pooler. |
| `DIRECT_URL` | Sim para migrations | Conexão direta usada pelo Prisma. A seed recorre a `DATABASE_URL` quando ela não está definida. |
| `API_DADOS_URL` | Sim para análises | Endereço-base do serviço de dados agrícolas e climáticos. |
| `JWT_SECRET` | Sim | Assina e valida os tokens de autenticação. |
| `JWT_EXPIRES_IN` | Não | Duração do JWT. O valor padrão da API é `1d`. |
| `PORT` | Sim | Porta da API local. Use `3333` para coincidir com o frontend. |
| `ADMIN_NAME` | Não | Nome do administrador criado ou atualizado pela seed. |
| `ADMIN_EMAIL` | Não | E-mail do administrador. Deve ser informado junto de `ADMIN_PASSWORD`. |
| `ADMIN_PASSWORD` | Não | Senha inicial do administrador, com pelo menos 8 caracteres. |

Você pode gerar uma chave JWT com:

```bash
openssl rand -base64 32
```

> Nunca envie `.env`, senhas, tokens ou URLs com credenciais para o Git.

### Frontend

Crie `apps/web/.env.local` com a URL pública da API:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3333
```

No deploy, substitua esse endereço pela URL HTTPS do backend hospedado no
Render. Reinicie o servidor Next.js sempre que alterar uma variável de ambiente.

## Banco de dados

O banco usa PostgreSQL com Prisma ORM. O arquivo principal do modelo é
`apps/backend/prisma/schema.prisma`, e o histórico está em
`apps/backend/prisma/migrations`.

### Preparar um banco existente

Com `DIRECT_URL` configurada, aplique as migrations versionadas:

```bash
npm exec -w backend -- prisma migrate deploy
npm exec -w backend -- prisma generate
```

Depois, carregue os municípios e, opcionalmente, o administrador:

```bash
npm run db:seed -w backend
```

### Criar uma migration durante o desenvolvimento

Após modificar `schema.prisma`:

```bash
npm exec -w backend -- prisma migrate dev --name descricao_da_alteracao
npm exec -w backend -- prisma generate
```

O diretório novo dentro de `prisma/migrations` deve ser incluído no commit.

### Inspecionar os dados

```bash
npm exec -w backend -- prisma studio
```

O Prisma Studio abre uma interface local para visualizar e editar registros. Não
o exponha publicamente em ambientes de produção.

## Tabelas e relacionamentos

```mermaid
erDiagram
    MUNICIPIOS ||--o{ ACCESS_REQUESTS : recebe

    MUNICIPIOS {
        int id PK
        string nome
        int regiao_imediata_id
        string regiao_imediata_nome
    }

    USERS {
        uuid id PK
        string name
        string email UK
        string password
        UserRole role
        string municipio
        int regiao_imediata_id
        string uf
        datetime created_at
        datetime updated_at
    }

    ACCESS_REQUESTS {
        uuid id PK
        string protocol UK
        string name
        string email UK
        string password_hash
        UserRole role
        int municipio_id FK
        int regiao_imediata_id
        bytes document_data
        AccessRequestStatus status
        datetime created_at
        datetime updated_at
    }
```

### `users`

Armazena as contas autorizadas a entrar na plataforma.

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | UUID | Chave primária gerada automaticamente. |
| `name` | Texto | Nome do usuário. |
| `email` | Texto | Único e usado na autenticação. |
| `password` | Texto | Hash da senha; nunca deve guardar texto puro. |
| `role` | `UserRole` | Define o perfil e o escopo de acesso. |
| `municipio` | Texto opcional | Município associado ao usuário. |
| `regiao_imediata_id` | Inteiro opcional | Região de atuação, especialmente para técnicos. |
| `uf` | Texto opcional | Unidade federativa. |
| `created_at` | Data/hora | Data de criação. |
| `updated_at` | Data/hora opcional | Atualizada pelo Prisma quando o registro muda. |

### `municipios`

Catálogo territorial carregado a partir da API de localidades do IBGE.

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | Inteiro | Chave primária correspondente ao código do IBGE. |
| `nome` | Texto | Nome do município. |
| `regiao_imediata_id` | Inteiro | Código da região geográfica imediata. |
| `regiao_imediata_nome` | Texto | Nome da região geográfica imediata. |

### `access_requests`

Mantém as solicitações enviadas antes da criação de uma conta.

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | UUID | Chave primária gerada automaticamente. |
| `protocol` | Texto | Código único usado no acompanhamento. |
| `name` | Texto | Nome do solicitante. |
| `email` | Texto | Único enquanto a solicitação existir. |
| `password_hash` | Texto | Hash da senha informada na solicitação. |
| `role` | `UserRole` | Perfil solicitado. |
| `municipio_id` | Inteiro opcional | Referência a `municipios.id`; ao excluir o município, recebe `NULL`. |
| `regiao_imediata_id` | Inteiro opcional | Região informada para o perfil aplicável. |
| `document_name` | Texto | Nome original do documento enviado. |
| `document_mime_type` | Texto | Tipo MIME do documento. |
| `document_data` | `BYTEA` | Conteúdo binário do documento. |
| `status` | `AccessRequestStatus` | Inicia como `PENDENTE`. |
| `rejection_reason` | Texto opcional | Justificativa registrada em uma recusa. |
| `reviewed_by` | Texto opcional | Identificação do responsável pela análise. |
| `reviewed_at` | Data/hora opcional | Momento da análise. |
| `created_at` | Data/hora | Data de envio. |
| `updated_at` | Data/hora | Data da última alteração. |

### Enumerações

| Enum | Valores |
| --- | --- |
| `UserRole` | `PRODUTOR`, `TECNICO_COOPERATIVA`, `GESTOR_PUBLICO`, `ADMIN` |
| `AccessRequestStatus` | `PENDENTE`, `APROVADA`, `RECUSADA` |

## Seed

A seed é segura para novas execuções: os municípios são inseridos ou atualizados
com `upsert`. Ela realiza duas tarefas:

1. Consulta os municípios do Ceará na API de localidades do IBGE.
2. Cria ou atualiza o administrador quando `ADMIN_EMAIL` e `ADMIN_PASSWORD`
   estão configurados.

Execute pela raiz:

```bash
npm run db:seed -w backend
```

Se as variáveis de administrador ficarem vazias, apenas os municípios serão
carregados.

## Execução local

### Frontend e backend juntos

```bash
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3333](http://localhost:3333)
- Swagger: [http://localhost:3333/docs](http://localhost:3333/docs)

### Serviços separados

Use dois terminais quando quiser acompanhar os logs individualmente:

```bash
npm run dev:web
```

```bash
npm run dev:backend
```

## Scripts disponíveis

### Raiz do monorepo

| Comando | Ação |
| --- | --- |
| `npm run dev` | Inicia frontend e backend simultaneamente. |
| `npm run dev:web` | Inicia apenas o Next.js na porta 3000. |
| `npm run dev:backend` | Inicia apenas a API com recarregamento automático. |
| `npm run build` | Gera o build do frontend e depois o do backend. |
| `npm run build:web` | Gera apenas o build do Next.js. |
| `npm run build:backend` | Compila apenas a API para `apps/backend/build`. |
| `npm run start:backend` | Executa o build compilado do backend. |

### Workspaces

| Comando | Ação |
| --- | --- |
| `npm run lint -w web` | Executa o ESLint no frontend. |
| `npm run start -w web` | Inicia o build de produção do Next.js. |
| `npm run db:seed -w backend` | Executa a seed do Prisma. |
| `npm exec -w backend -- prisma migrate deploy` | Aplica migrations pendentes. |
| `npm exec -w backend -- prisma generate` | Atualiza o Prisma Client. |
| `npm exec -w backend -- prisma studio` | Abre o explorador visual do banco. |

## Build de produção

Gere os dois builds a partir da raiz:

```bash
npm run build
```

Para simular a execução de produção localmente, inicie cada aplicação em um
terminal depois do build:

```bash
npm run start -w web
```

```bash
npm run start:backend
```

## Configuração dos serviços

### Supabase

1. Crie um projeto PostgreSQL.
2. Copie a conexão com pooler para `DATABASE_URL`.
3. Copie a conexão direta para `DIRECT_URL`.
4. Aplique as migrations e execute a seed.
5. Guarde as credenciais somente nas variáveis do ambiente local e da hospedagem.

### Render

Configure o serviço do backend com:

| Opção | Valor |
| --- | --- |
| Diretório raiz | Raiz do monorepo |
| Build command | `npm install && npm exec -w backend -- prisma generate && npm run build:backend` |
| Start command | `npm run start:backend` |

Cadastre no Render as variáveis do backend. O próprio serviço fornece `PORT` em
produção, portanto não fixe uma porta diferente no painel. Antes de liberar uma
nova versão, execute `npm exec -w backend -- prisma migrate deploy` em um ambiente
com acesso ao mesmo banco.

### Vercel

Configure o frontend com:

| Opção | Valor |
| --- | --- |
| Root Directory | `apps/web` |
| Framework Preset | Next.js |
| Variável | `NEXT_PUBLIC_API_URL=https://sua-api.onrender.com` |

Depois de alterar `NEXT_PUBLIC_API_URL`, faça um novo deploy para que o valor seja
incorporado ao build do Next.js.

## Solução de problemas

### O login funciona no Swagger, mas não no frontend

- Confirme `NEXT_PUBLIC_API_URL` em `apps/web/.env.local`.
- Verifique se a URL aponta para a API, e não para o próprio frontend.
- Reinicie o Next.js após alterar o arquivo de ambiente.
- Em produção, use HTTPS nos dois serviços para evitar bloqueio por conteúdo misto.

### O Prisma não conecta ou não aplica migrations

- Confirme que `DIRECT_URL` usa a conexão direta do PostgreSQL.
- Verifique usuário, senha, host, porta e parâmetros da URL.
- Se a senha contiver caracteres especiais, aplique codificação de URL.
- Confira se o projeto do Supabase está ativo e aceita conexões.

### A API inicia sem porta ou o frontend recebe erro de rede

- Defina `PORT=3333` no ambiente local do backend.
- Confirme que não existe outro processo usando as portas 3000 ou 3333.
- Abra `http://localhost:3333/docs` para validar a API separadamente.

### A seed falha

- Confirme `DIRECT_URL` ou `DATABASE_URL`.
- Verifique o acesso à internet, pois os municípios são consultados no IBGE.
- Se for criar o administrador, informe `ADMIN_EMAIL` e `ADMIN_PASSWORD` juntos.
- Use uma senha administrativa com pelo menos 8 caracteres.

---

<p align="center">
  Consulte também o <a href="./README.md">README principal</a> para conhecer o produto,
  os fluxos e a equipe.
</p>
