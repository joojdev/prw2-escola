# PRW2 — API de Alunos com JWT

API REST em Node.js + Express + TypeScript para gerenciamento de alunos com autenticação via JWT.

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

Servidor sobe na porta `3000` (configurável via `PORT` no `.env`).

## Build e produção

```bash
npm run build   # compila TypeScript para dist/
npm start       # executa dist/server.js
```

## Endpoints

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/register` | Não | Registra novo usuário |
| POST | `/login` | Não | Autentica e retorna JWT |
| GET | `/alunos` | Sim | Lista todos os alunos |
| GET | `/alunos/medias` | Sim | Retorna nome e média de cada aluno |
| GET | `/alunos/aprovados` | Sim | Retorna nome e status (aprovado/reprovado) |
| GET | `/alunos/:id` | Sim | Busca aluno por ID |
| POST | `/alunos` | Sim | Cria novo aluno |
| PUT | `/alunos/:id` | Sim | Atualiza aluno existente |
| DELETE | `/alunos/:id` | Sim | Remove aluno |

Para rotas autenticadas, envie o header `Authorization: Bearer <token>` obtido no `/login`.
