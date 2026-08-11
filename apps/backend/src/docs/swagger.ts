const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Chuva e Safra API",
    version: "1.0.0",
    description:
      "API de autenticação e consulta de análises agrícolas para produtores, técnicos de cooperativa e gestores públicos.",
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
      description: "Cadastro de usuários e emissão de token JWT.",
    },
    {
      name: "Análises",
      description: "Consulta autenticada de dados agrícolas conforme o perfil do usuário.",
    },
  ],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Autenticação"],
        summary: "Cadastrar usuário",
        description:
          "Cria um usuário. Produtores devem informar um código IBGE de município do Ceará. A UF de gestores públicos é definida como CE pelo backend.",
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
                  summary: "Produtor",
                  value: {
                    name: "Produtor Teste",
                    email: "produtor@example.com",
                    password: "123456",
                    role: "PRODUTOR",
                    municipio: "2304400",
                  },
                },
                tecnico: {
                  summary: "Técnico de cooperativa",
                  value: {
                    name: "Técnico Teste",
                    email: "tecnico@example.com",
                    password: "123456",
                    role: "TECNICO_COOPERATIVA",
                  },
                },
                gestor: {
                  summary: "Gestor público",
                  value: {
                    name: "Gestor Teste",
                    email: "gestor@example.com",
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
    "/analises": {
      get: {
        tags: ["Análises"],
        summary: "Consultar análises agrícolas",
        description:
          "Adapta os filtros ao perfil autenticado: produtor usa o município cadastrado; técnico deve informar municipios; gestor usa a UF CE cadastrada.",
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
              "Obrigatório somente para TECNICO_COOPERATIVA. Códigos IBGE de 7 dígitos do Ceará separados por vírgula.",
            schema: {
              type: "string",
              pattern: "^23\\d{5}(,\\s*23\\d{5})*$",
            },
            example: "2304400,2303709",
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
        enum: ["PRODUTOR", "TECNICO_COOPERATIVA", "GESTOR_PUBLICO"],
        example: "PRODUTOR",
      },
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password", "role"],
        properties: {
          name: {
            type: "string",
            minLength: 3,
            maxLength: 100,
            example: "Produtor Teste",
          },
          email: {
            type: "string",
            format: "email",
            minLength: 5,
            example: "produtor@example.com",
          },
          password: {
            type: "string",
            format: "password",
            minLength: 6,
            example: "123456",
          },
          role: {
            $ref: "#/components/schemas/UserRole",
          },
          municipio: {
            type: "string",
            pattern: "^23\\d{5}$",
            description:
              "Código IBGE de um município do Ceará. Necessário para o perfil PRODUTOR.",
            example: "2304400",
          },
          uf: {
            type: "string",
            minLength: 2,
            maxLength: 2,
            description:
              "Campo aceito na validação. Para GESTOR_PUBLICO, o backend atualmente define CE.",
            example: "CE",
          },
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
                value: { message: ["E-mail inválido"] },
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
