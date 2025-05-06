Collecting workspace information# Desafio Cubos Backend - API de Filmes e Gêneros

Este é um projeto backend desenvolvido em Node.js com TypeScript, focado na gestão de filmes e seus gêneros. A API permite o gerenciamento completo de filmes, incluindo cadastro, atualização, busca avançada com filtros e exclusão.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT para autenticação
- Multer para upload de arquivos
- Swagger para documentação
- Jest para testes

## Estrutura do Projeto

O projeto segue os princípios do Clean Architecture e SOLID, com uma estrutura de pastas modular:

```
.
├── src/
│   ├── @types/              # Definição de tipos personalizados
│   ├── config/              # Configurações da aplicação
│   ├── modules/             # Módulos da aplicação
│   │   ├── accounts/        # Módulo de contas/usuários
│   │   ├── genres/          # Módulo de gêneros
│   │   └── movies/          # Módulo de filmes
│   ├── shared/              # Recursos compartilhados
│   │   ├── container/       # Injeção de dependências
│   │   ├── errors/          # Tratamento de erros
│   │   └── infra/           # Infraestrutura (HTTP, database)
│   ├── utils/               # Utilitários
│   ├── swagger.json         # Documentação da API
│   └── app.ts               # Ponto de entrada da aplicação
├── tmp/                     # Pasta para arquivos temporários e uploads
└── ...                      # Arquivos de configuração
```

## Funcionalidades Principais

### Autenticação e Usuários
- Cadastro de usuários
- Autenticação com JWT
- Refresh token
- Recuperação de senha via email
- Upload de avatar

### Gêneros
- Criação de gêneros de filmes
- Listagem de gêneros
- Exclusão de gêneros

### Filmes
- Cadastro completo de filmes com múltiplas imagens
- Associação de múltiplos gêneros a um filme
- Busca avançada com filtros por:
  - Nome (título ou título original)
  - Gêneros
  - Duração (menos de 1h, entre 1-2h, mais de 2h)
  - Período de lançamento
- Visualização detalhada de filme
- Atualização de dados do filme
- Exclusão de filme

## Pré-requisitos

Para rodar o projeto, você precisará ter instalado:

- Node.js (v14+ recomendado)
- NPM ou Yarn
- PostgreSQL
- Redis (opcional, para cache)

## Como Instalar e Executar

### 1. Clone o repositório

```bash
git clone https://github.com/GabrielRibeiro19/desafio-cubos-be.git
cd desafio-cubos-be
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo .env com base no .env.example:

```bash
cp .env.example .env
```

Abra o arquivo .env e ajuste as configurações conforme seu ambiente:

```
# Servidor
PORT=3333
APP_API_URL=http://localhost:3333

# Armazenamento de imagem (escolha local ou s3 para amazon)
disk=[local | s3]
```

### 4. Configure o banco de dados

Crie um arquivo ormconfig.json com base no ormconfig.example.json:

```bash
cp ormconfig.example.json ormconfig.json
```

Ajuste as configurações do banco de dados no arquivo ormconfig.json:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "sua_senha",
  "database": "desafio_cubos",
  "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
```

### 5. Execute as migrations

```bash
npm run typeorm migration:run
# ou
yarn typeorm migration:run
```

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O servidor estará disponível em `http://localhost:3333`

## Como Compilar para Produção

Para compilar o projeto para ambiente de produção, siga os passos:

### 1. Compile o código TypeScript

```bash
npm run build
# ou
yarn build
```

Os arquivos compilados serão gerados na pasta `dist/`.

### 2. Execute o servidor em produção

```bash
npm run start
# ou
yarn start
```

## Documentação da API

A API é documentada usando Swagger e está disponível no endpoint `/api-docs` quando o servidor estiver rodando.

Acesse `http://localhost:3333/api-docs` para ver a documentação interativa, onde você poderá testar todos os endpoints.

## Exemplos de Uso

### Autenticação

```bash
# Login
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","password":"senha123"}'
```

### Criação de Gênero

```bash
# Criar gênero (com autenticação)
curl -X POST http://localhost:3333/genres \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token_jwt" \
  -d '{"title":"Ação"}'
```

### Criação de Filme

Para criar um filme (com upload de imagens), você precisará usar um cliente HTTP como Postman ou Insomnia, ou criar um formulário HTML com `enctype="multipart/form-data"`.

Os campos necessários são:
- title
- original_title
- overview
- genre_ids (IDs dos gêneros separados por vírgula)
- trailer_url
- popularity
- votes
- rating
- release_date
- status
- language
- budget
- revenue
- profit
- duration
- image
- image_secondary (opcional)

---

Desenvolvido como parte do Desafio Técnico para Cubos Tecnologia.

Similar code found with 1 license type
