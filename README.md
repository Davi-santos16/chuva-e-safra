<div align="center">
  <img src="./apps/web/public/logos/logo-horizontal-light.svg" alt="Chuva & Safra" width="260" />

  <h3>Inteligência agrícola para decisões mais seguras no campo</h3>

  <p>
    Uma plataforma que reúne dados de chuva, produtividade e território para
    apoiar produtores rurais, técnicos agrícolas e gestores públicos do Ceará.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </p>
</div>

---

## Prévia da aplicação

<p align="center">
  <img src="./apps/web/public/images/chuva-e-safra.gif" alt="Demonstração da plataforma Chuva & Safra" width="900" />
</p>

## Sobre o projeto

O **Chuva & Safra** é uma plataforma de análise agrícola criada para transformar
dados climáticos e produtivos em informações acessíveis para quem atua no campo.
O sistema considera o território e o perfil de cada usuário para entregar recortes
compatíveis com sua área de atuação.

A aplicação atende quatro perfis:

- **Produtor rural:** acompanha informações do município associado ao cadastro.
- **Técnico agrícola:** compara municípios pertencentes à sua região imediata.
- **Gestor público:** visualiza o panorama agrícola do estado do Ceará.
- **Administrador:** gerencia usuários e solicitações de acesso.

## Principais funcionalidades

- Autenticação com JWT e segregação de acesso por perfil.
- Solicitação de acesso para produtores e técnicos.
- Aprovação e recusa de solicitações pela área administrativa.
- Consulta do andamento da solicitação por protocolo.
- Análises de chuva, produtividade e culturas agrícolas.
- Filtros por cultura, período, município e região de atuação.
- Visualizações interativas e indicadores agrícolas.
- Integração com dados territoriais e agrícolas do IBGE/SIDRA.
- Interface responsiva alinhada à identidade visual do Chuva & Safra.

## Fluxo de solicitação e acesso

```mermaid
flowchart TD
    A[Landing page] --> B[Solicitar acesso]
    B --> C{Escolher perfil}
    C -->|Produtor rural| D[Informar dados, senha e município]
    C -->|Técnico agrícola| E[Informar dados, senha e região imediata]
    D --> F[Enviar documento CAF]
    E --> G[Enviar registro profissional CREA ou CFTA]
    F --> H[Revisar e confirmar]
    G --> H
    H --> I[Solicitação pendente]
    I --> J[Administrador analisa os dados e o documento]
    J --> K{Decisão}
    K -->|Aprovar| L[Conta criada e acesso liberado]
    K -->|Recusar| M[Motivo da recusa disponível no acompanhamento]
    L --> N[Usuário entra com e-mail e senha]
    N --> O{Perfil do usuário}
    O -->|Produtor| P[Dashboard do produtor]
    O -->|Técnico| Q[Dashboard do técnico]
```

Durante a análise, o solicitante pode consultar o andamento usando o protocolo
gerado no envio. A autenticação só é liberada após a aprovação administrativa.

### Entrada de usuários já aprovados

```mermaid
flowchart LR
    A[E-mail e senha] --> B[API valida as credenciais]
    B --> C{Credenciais válidas?}
    C -->|Não| D[Exibir mensagem de erro]
    C -->|Sim| E[Gerar JWT com a função do usuário]
    E --> F[Carregar dados do perfil]
    F --> G{Função no JWT}
    G -->|PRODUTOR| H[Área do produtor]
    G -->|TECNICO_COOPERATIVA| I[Área do técnico]
    G -->|GESTOR_PUBLICO| J[Área do gestor]
    G -->|ADMIN| K[Área administrativa]
```

## Arquitetura

O projeto utiliza uma estrutura de **monorepo** com npm workspaces:

```text
chuva-e-safra/
├── apps/
│   ├── web/          # Interface em Next.js
│   └── backend/      # API REST em Express
├── package.json
└── package-lock.json
```

O frontend consome a API REST do projeto. O backend centraliza autenticação,
regras de acesso, consultas agrícolas e persistência dos dados por meio do Prisma.

<h2>Tecnologias</h2>

<kbd>
  <kbd>Front-end</kbd>
  <br><br>
  <p align="center">
    <img
      src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,radix&perline=5"
      width="325"
      alt="Next.js, React, TypeScript, Tailwind CSS e Radix UI"
    />
    <br><br>
    <img src="https://cdn.simpleicons.org/axios/5A29E4" width="48" height="48" alt="Axios" title="Axios" />
    &nbsp;&nbsp;
    <img src="https://cdn.simpleicons.org/plotly/3F4F75" width="48" height="48" alt="Plotly.js" title="Plotly.js" />
  </p>
</kbd>

<br><br>

<kbd>
  <kbd>Back-end</kbd>
  <br><br>
  <p align="center">
    <img
      src="https://skillicons.dev/icons?i=nodejs,express,ts,prisma,postgres&perline=5"
      width="325"
      alt="Node.js, Express, TypeScript, Prisma e PostgreSQL"
    />
    <br><br>
    <img src="https://cdn.simpleicons.org/zod/3E67B1" width="48" height="48" alt="Zod" title="Zod" />
    &nbsp;&nbsp;
    <img src="https://cdn.simpleicons.org/jsonwebtokens/000000" width="48" height="48" alt="JSON Web Token" title="JSON Web Token" />
  </p>
</kbd>

<br><br>

<kbd>
  <kbd>Dados e integrações</kbd>
  <br><br>
  <p align="center">
    <img
      src="https://skillicons.dev/icons?i=supabase,postgres&perline=2"
      width="130"
      alt="Supabase e PostgreSQL"
    />
  </p>
</kbd>

## Infraestrutura

<table>
  <tr>
    <td align="center" width="33%">
      <img src="https://cdn.simpleicons.org/vercel/000000" alt="Vercel" width="48" height="48" />
      <br />
      <strong>Vercel</strong>
      <br />
      Frontend Next.js
    </td>
    <td align="center" width="33%">
      <img src="https://cdn.simpleicons.org/render/46E3B7" alt="Render" width="48" height="48" />
      <br />
      <strong>Render</strong>
      <br />
      API e serviços do backend
    </td>
    <td align="center" width="33%">
      <img src="https://cdn.simpleicons.org/supabase/3FCF8E" alt="Supabase" width="48" height="48" />
      <br />
      <strong>Supabase</strong>
      <br />
      Banco de dados PostgreSQL
    </td>
  </tr>
</table>

## Uso

Para configurar o ambiente de desenvolvimento, preparar o banco de dados,
consultar as tabelas e executar os scripts do projeto, acesse o
[Tutorial de configuração](./TUTORIAL.md).

## Equipe

<table>
  <tr>
    <td align="center" width="16.66%">
      <img src="https://github.com/Davi-santos16.png?size=180" width="150" height="150" alt="Foto de Davi Castro" />
      <br />
      <strong>Davi Castro</strong>
    </td>
    <td align="center" width="16.66%">
      <img src="https://github.com/DanielVerissimo1.png?size=180" width="150" height="150" alt="Foto de Daniel Verissimo" />
      <br />
      <strong>Daniel Verissimo</strong>
    </td>
    <td align="center" width="16.66%">
      <img src="https://github.com/anthonyeduardob.png?size=180" width="150" height="150" alt="Foto de Anthony Eduardo" />
      <br />
      <strong>Anthony Eduardo</strong>
    </td>
    <td align="center" width="16.66%">
      <img src="./apps/web/public/images/profile/daniel-gomes.png" width="150" height="150" alt="Foto de Daniel Gomes" />
      <br />
      <strong>Daniel Gomes</strong>
    </td>
    <td align="center" width="16.66%">
      <img src="./apps/web/public/images/profile/sara.png" width="150" height="150" alt="Foto de Sara" />
      <br />
      <strong>Sara</strong>
    </td>
    <td align="center" width="16.66%">
      <img src="https://github.com/Dev-Lucas-Gabriel.png?size=180" width="150" height="150" alt="Foto de Lucas Gabriel" />
      <br />
      <strong>Lucas Gabriel</strong>
    </td>
  </tr>
  <tr>
    <td align="center"><a href="https://br.linkedin.com/in/davigcastro">LinkedIn</a></td>
    <td align="center"><a href="https://br.linkedin.com/in/daniel-verissimo">LinkedIn</a></td>
    <td align="center"><a href="https://br.linkedin.com/in/anthony-eduardo-barros">LinkedIn</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/daniel-freitas-5b23b540a/">LinkedIn</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/sara-queiroz-%F0%9F%91%A9%F0%9F%8F%BD%E2%80%8D%F0%9F%92%BB-aa8a40420/">LinkedIn</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/lucas-gabriel-71165332b/">LinkedIn</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Davi-santos16">GitHub</a></td>
    <td align="center"><a href="https://github.com/DanielVerissimo1">GitHub</a></td>
    <td align="center"><a href="https://github.com/anthonyeduardob">GitHub</a></td>
    <td align="center"><a href="https://github.com/danielfgsdev">GitHub</a></td>
    <td align="center"><a href="https://github.com/sarinhaqueirozzz">GitHub</a></td>
    <td align="center"><a href="https://github.com/Dev-Lucas-Gabriel">GitHub</a></td>
  </tr>
</table>

---

<p align="center">
  Desenvolvido para aproximar tecnologia, dados e agricultura no Ceará.
</p>
