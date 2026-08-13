const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Chuva e Safra API",
    version: "1.0.0",
    description:
      "API de autenticação e consulta de análises agrícolas para produtores, técnicos de cooperativa e gestores públicos. No cadastro, informe exatamente um dos tipos de usuário documentados em POST /auth/register.",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Ambiente local",
    },
  ],
  tags: [
    {
      name: "Autenticação",
      description:
        "Cadastro por tipo de usuário (produtor, técnico de cooperativa ou gestor público) e emissão de token JWT.",
    },
    {
      name: "Análises",
      description: "Consulta autenticada de dados agrícolas conforme o perfil do usuário.",
    },
    {
      name: "Municípios",
      description: "Regiões imediatas e municípios permitidos para o técnico.",
    },
    {
      name: "Administração",
      description: "Gestão de usuários disponível exclusivamente para administradores.",
    },
  ],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Autenticação"],
        summary: "Cadastrar um usuário conforme o seu tipo",
        description: `Cria uma conta usando um dos três valores aceitos no campo \`role\`.

Campos comuns e obrigatórios para todos os usuários:

| Campo | O que enviar |
| --- | --- |
| \`name\` | Nome completo, entre 3 e 100 caracteres. |
| \`email\` | E-mail válido, com pelo menos 5 caracteres e ainda não cadastrado. |
| \`password\` | Senha com pelo menos 6 caracteres. |
| \`role\` | Tipo exato do usuário: \`PRODUTOR\`, \`TECNICO_COOPERATIVA\` ou \`GESTOR_PUBLICO\`. |

Campos específicos por tipo:

| Tipo de usuário (\`role\`) | Campo adicional obrigatório | O que não deve ser enviado |
| --- | --- | --- |
| \`PRODUTOR\` | \`municipio\`: código IBGE de 7 dígitos de um município do Ceará, iniciado por \`23\`. | \`regiaoImediataId\` e \`uf\`. |
| \`TECNICO_COOPERATIVA\` | \`regiaoImediataId\`: código inteiro positivo de uma região imediata do Ceará. Consulte os valores em \`GET /municipios/regioes-imediatas\`. | \`municipio\` e \`uf\`. |
| \`GESTOR_PUBLICO\` | Nenhum. Envie somente os campos comuns. | \`municipio\`, \`regiaoImediataId\` e \`uf\`. A API define a UF como \`CE\` automaticamente. |

Selecione abaixo o schema correspondente ao tipo de usuário para ver apenas os campos daquele cadastro.`,
        operationId: "registerUser",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
              examples: {
                produtor: {
                  summary: "Cadastro de produtor (PRODUTOR)",
                  description:
                    "O produtor deve enviar o código IBGE do município do Ceará em que atua.",
                  value: {
                    name: "Maria da Silva",
                    email: "maria.produtora@example.com",
                    password: "123456",
                    role: "PRODUTOR",
                    municipio: "2304400",
                  },
                },
                tecnico: {
                  summary: "Cadastro de técnico (TECNICO_COOPERATIVA)",
                  description:
                    "O técnico deve enviar uma região imediata existente no Ceará.",
                  value: {
                    name: "João Oliveira",
                    email: "joao.tecnico@example.com",
                    password: "123456",
                    role: "TECNICO_COOPERATIVA",
                    regiaoImediataId: 230002,
                  },
                },
                gestor: {
                  summary: "Cadastro de gestor (GESTOR_PUBLICO)",
                  description:
                    "O gestor envia somente os campos comuns; a API atribui a UF CE.",
                  value: {
                    name: "Ana Souza",
                    email: "ana.gestora@example.com",
                    password: "123456",
                    role: "GESTOR_PUBLICO",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Usuário criado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
                example: { message: "Usuário criado com sucesso" },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "409": {
            description: "O e-mail já está cadastrado.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
                example: { message: "Email já está em uso" },
              },
            },
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Autenticação"],
        summary: "Autenticar usuário",
        description:
          "Valida e-mail e senha e retorna um token JWT. Use o token no botão Authorize para acessar as análises.",
        operationId: "loginUser",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
              example: {
                email: "produtor@example.com",
                password: "123456",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Autenticação realizada com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TokenResponse" },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "401": {
            description: "Credenciais inválidas.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
                example: { message: "E-mail ou senha inválidos" },
              },
            },
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/me": {
      get: {
        tags: ["Autenticação"],
        summary: "Obter o usuário autenticado",
        description:
          "Retorna os dados atuais da conta identificada pelo token JWT, sem expor a senha.",
        operationId: "getCurrentUser",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Dados do usuário autenticado.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MeResponse" },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/municipios/regioes-imediatas": {
      get: {
        tags: ["Municípios"],
        summary: "Listar regiões imediatas",
        description: "Lista as regiões disponíveis para o select do cadastro de técnico.",
        operationId: "getImmediateRegions",
        responses: {
          "200": {
            description: "Regiões imediatas cadastradas.",
            content: {
              "application/json": {
                example: {
                  regioes: [
                    {
                      regiaoImediataId: 230002,
                      regiaoImediataNome: "Itapipoca",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/municipios/todos": {
      get: {
        tags: ["Municípios"],
        summary: "Listar todos os municípios",
        description:
          "Rota pública que retorna todos os municípios do Ceará, em ordem alfabética, com a respectiva região imediata.",
        operationId: "getAllMunicipalities",
        responses: {
          "200": {
            description: "Todos os municípios do Ceará cadastrados.",
            content: {
              "application/json": {
                example: {
                  municipios: [
                    {
                      id: 2300101,
                      nome: "Abaiara",
                      regiaoImediataId: 230011,
                      regiaoImediataNome: "Brejo Santo",
                    },
                  ],
                },
              },
            },
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/municipios": {
      get: {
        tags: ["Municípios"],
        summary: "Listar municípios do técnico",
        description: "Retorna somente os municípios da região imediata do técnico autenticado.",
        operationId: "getTechnicianMunicipalities",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Municípios permitidos para o técnico.",
            content: {
              "application/json": {
                example: {
                  municipios: [
                    { id: 2300754, nome: "Amontada" },
                  ],
                },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            description: "A rota é exclusiva para técnicos.",
          },
        },
      },
    },
    "/analises": {
      get: {
        tags: ["Análises"],
        summary: "Consultar análises agrícolas",
        description:
          "Adapta os filtros ao perfil autenticado. Os municípios enviados pelo técnico devem pertencer à região imediata cadastrada nele.",
        operationId: "getAnalyses",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "cultura",
            in: "query",
            required: true,
            description: "Nome da cultura agrícola.",
            schema: { type: "string", minLength: 1 },
            example: "milho",
          },
          {
            name: "de",
            in: "query",
            required: true,
            description: "Ano inicial do período.",
            schema: { type: "integer" },
            example: 2020,
          },
          {
            name: "ate",
            in: "query",
            required: true,
            description: "Ano final do período. Deve ser maior ou igual ao ano inicial.",
            schema: { type: "integer" },
            example: 2024,
          },
          {
            name: "municipios",
            in: "query",
            required: false,
            description:
              "Obrigatório para técnico. Aceita um ou mais códigos IBGE da região imediata dele, separados por vírgula.",
            schema: {
              type: "string",
              pattern: "^23\\d{5}(,\\s*23\\d{5})*$",
            },
            example: "2300754,2306405",
          },
        ],
        responses: {
          "200": {
            description: "Análise retornada pela API de dados.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AnalysisResponse" },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            description: "O perfil não possui autorização para acessar a rota.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
                example: { message: "Não autorizado" },
              },
            },
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/admin/users": {
      get: {
        tags: ["Administração"],
        summary: "Listar usuários da plataforma",
        description:
          "Retorna as contas cadastradas e a quantidade por perfil. Requer um JWT com role ADMIN.",
        operationId: "getAdminUsers",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Usuários e resumo por perfil.",
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": {
            description: "A rota é exclusiva para administradores.",
          },
        },
      },
      post: {
        tags: ["Administração"],
        summary: "Criar outro administrador",
        description:
          "Provisiona uma nova conta administrativa. A rota pública de cadastro não aceita ADMIN.",
        operationId: "createAdminUser",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateAdminRequest" },
              example: {
                name: "Administrador da plataforma",
                email: "admin@example.com",
                password: "senha-segura",
                role: "ADMIN",
              },
            },
          },
        },
        responses: {
          "201": { description: "Administrador criado com sucesso." },
          "400": { $ref: "#/components/responses/BadRequest" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { description: "A rota é exclusiva para administradores." },
          "409": { description: "O e-mail já está cadastrado." },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT retornado por POST /auth/login.",
      },
    },
    schemas: {
      UserRole: {
        type: "string",
        enum: ["PRODUTOR", "TECNICO_COOPERATIVA", "GESTOR_PUBLICO", "ADMIN"],
        description: `Tipo de usuário e escopo dos dados agrícolas:

- \`PRODUTOR\`: vinculado a um município do Ceará.
- \`TECNICO_COOPERATIVA\`: vinculado a uma região imediata do Ceará.
- \`GESTOR_PUBLICO\`: vinculado automaticamente à UF CE.
- \`ADMIN\`: gerencia contas e não possui escopo de análise agrícola.`,
        example: "PRODUTOR",
      },
      RegisterRequest: {
        title: "Dados de cadastro por tipo de usuário",
        description:
          "Escolha o contrato que corresponde ao valor enviado em `role`. Não misture campos específicos de tipos diferentes.",
        oneOf: [
          { $ref: "#/components/schemas/RegisterProdutorRequest" },
          { $ref: "#/components/schemas/RegisterTecnicoRequest" },
          { $ref: "#/components/schemas/RegisterGestorRequest" },
        ],
        discriminator: {
          propertyName: "role",
          mapping: {
            PRODUTOR: "#/components/schemas/RegisterProdutorRequest",
            TECNICO_COOPERATIVA: "#/components/schemas/RegisterTecnicoRequest",
            GESTOR_PUBLICO: "#/components/schemas/RegisterGestorRequest",
          },
        },
      },
      RegisterProdutorRequest: {
        title: "Cadastro de produtor",
        type: "object",
        description:
          "Use este contrato quando o usuário produz ou acompanha uma propriedade em um município específico do Ceará.",
        required: ["name", "email", "password", "role", "municipio"],
        properties: {
          name: {
            type: "string",
            minLength: 3,
            maxLength: 100,
            description: "Nome completo do produtor.",
            example: "Maria da Silva",
          },
          email: {
            type: "string",
            format: "email",
            minLength: 5,
            description: "E-mail usado para entrar na plataforma. Deve ser único.",
            example: "maria.produtora@example.com",
          },
          password: {
            type: "string",
            format: "password",
            minLength: 6,
            writeOnly: true,
            description: "Senha de acesso com no mínimo 6 caracteres.",
            example: "123456",
          },
          role: {
            type: "string",
            enum: ["PRODUTOR"],
            description: "Valor obrigatório para identificar o usuário como produtor.",
            example: "PRODUTOR",
          },
          municipio: {
            type: "string",
            pattern: "^23\\d{5}$",
            minLength: 7,
            maxLength: 7,
            description:
              "Código IBGE, com 7 dígitos, do município do produtor no Ceará. Deve começar por 23. Envie como texto para preservar o formato do código.",
            example: "2304400",
          },
        },
        additionalProperties: false,
      },
      RegisterTecnicoRequest: {
        title: "Cadastro de técnico de cooperativa",
        type: "object",
        description:
          "Use este contrato para o técnico que atende os municípios de uma região imediata do Ceará.",
        required: ["name", "email", "password", "role", "regiaoImediataId"],
        properties: {
          name: {
            type: "string",
            minLength: 3,
            maxLength: 100,
            description: "Nome completo do técnico.",
            example: "João Oliveira",
          },
          email: {
            type: "string",
            format: "email",
            minLength: 5,
            description: "E-mail usado para entrar na plataforma. Deve ser único.",
            example: "joao.tecnico@example.com",
          },
          password: {
            type: "string",
            format: "password",
            minLength: 6,
            writeOnly: true,
            description: "Senha de acesso com no mínimo 6 caracteres.",
            example: "123456",
          },
          role: {
            type: "string",
            enum: ["TECNICO_COOPERATIVA"],
            description:
              "Valor obrigatório para identificar o usuário como técnico de cooperativa.",
            example: "TECNICO_COOPERATIVA",
          },
          regiaoImediataId: {
            type: "integer",
            format: "int32",
            minimum: 1,
            description:
              "Código de uma região geográfica imediata existente no Ceará. Obtenha um código válido em GET /municipios/regioes-imediatas.",
            example: 230002,
          },
        },
        additionalProperties: false,
      },
      RegisterGestorRequest: {
        title: "Cadastro de gestor público",
        type: "object",
        description:
          "Use este contrato para o gestor estadual. Não envie `uf`: a API salva CE automaticamente.",
        required: ["name", "email", "password", "role"],
        properties: {
          name: {
            type: "string",
            minLength: 3,
            maxLength: 100,
            description: "Nome completo do gestor público.",
            example: "Ana Souza",
          },
          email: {
            type: "string",
            format: "email",
            minLength: 5,
            description: "E-mail usado para entrar na plataforma. Deve ser único.",
            example: "ana.gestora@example.com",
          },
          password: {
            type: "string",
            format: "password",
            minLength: 6,
            writeOnly: true,
            description: "Senha de acesso com no mínimo 6 caracteres.",
            example: "123456",
          },
          role: {
            type: "string",
            enum: ["GESTOR_PUBLICO"],
            description: "Valor obrigatório para identificar o usuário como gestor público.",
            example: "GESTOR_PUBLICO",
          },
        },
        additionalProperties: false,
      },
      CreateAdminRequest: {
        title: "Criação protegida de administrador",
        type: "object",
        required: ["name", "email", "password", "role"],
        properties: {
          name: { type: "string", minLength: 3, maxLength: 100 },
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password", minLength: 8, writeOnly: true },
          role: { type: "string", enum: ["ADMIN"] },
        },
        additionalProperties: false,
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "produtor@example.com",
          },
          password: {
            type: "string",
            format: "password",
            minLength: 6,
            example: "123456",
          },
        },
        additionalProperties: false,
      },
      TokenResponse: {
        type: "object",
        required: ["token"],
        properties: {
          token: {
            type: "string",
            description: "Token JWT assinado contendo o identificador e o perfil do usuário.",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
      CurrentUser: {
        type: "object",
        required: ["id", "name", "email", "role", "createdAT"],
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string", example: "Maria da Silva" },
          email: { type: "string", format: "email", example: "maria@example.com" },
          role: { $ref: "#/components/schemas/UserRole" },
          municipio: {
            type: "string",
            nullable: true,
            description: "Código IBGE do município vinculado ao produtor.",
            example: "2304400",
          },
          regiaoImediataId: {
            type: "integer",
            nullable: true,
            description: "Região imediata vinculada ao técnico.",
            example: 230002,
          },
          uf: {
            type: "string",
            nullable: true,
            example: "CE",
          },
          createdAT: { type: "string", format: "date-time" },
          updatedAT: { type: "string", format: "date-time", nullable: true },
        },
      },
      MeResponse: {
        type: "object",
        required: ["user"],
        properties: {
          user: { $ref: "#/components/schemas/CurrentUser" },
        },
      },
      MessageResponse: {
        type: "object",
        required: ["message"],
        properties: {
          message: {
            oneOf: [
              { type: "string" },
              { type: "array", items: { type: "string" } },
            ],
          },
        },
      },
      AnalysisResponse: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            description: "Conteúdo retornado pela API externa de dados agrícolas.",
            nullable: true,
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Dados de entrada inválidos.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MessageResponse" },
            examples: {
              validacao: {
                summary: "Erro de validação",
                value: { message: ["Email inválido"] },
              },
              tipoUsuario: {
                summary: "Tipo de usuário inválido",
                value: { message: ["Role inválida"] },
              },
              regiaoTecnico: {
                summary: "Região imediata inválida para técnico",
                value: { message: "Região imediata não encontrada no Ceará" },
              },
              regraNegocio: {
                summary: "Regra de negócio",
                value: { message: "O ano inicial não pode ser maior que o ano final." },
              },
            },
          },
        },
      },
      Unauthorized: {
        description: "Token JWT ausente, inválido ou usuário não encontrado.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MessageResponse" },
            example: { message: "Token JWT inválido" },
          },
        },
      },
      InternalServerError: {
        description: "Erro interno do servidor.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MessageResponse" },
          },
        },
      },
    },
  },
} as const;

export { swaggerDocument };
