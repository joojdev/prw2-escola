# prw2-escola

API REST para gerenciamento de alunos com autenticação JWT. Desenvolvida com Node.js, Express e TypeScript.

## Configuração

Renomeie `.env.example` para `.env` e ajuste as variáveis:

```
PORT=3000
JWT_SECRET=sua_chave_secreta
```

> PS: o .env foi commitado pois o professor pediu.

## Instalação e execução

```bash
npm install
npm run dev
```

Para build de produção:

```bash
npm run build
npm start
```

## Implementação

### Arquitetura

O projeto segue uma separação em camadas: models definem as interfaces de dados, repositories guardam os registros em memória (arrays em módulo), services contêm a lógica de negócio e controllers lidam com request/response. As rotas conectam tudo com os middlewares necessários.

### Dados em memória

Não há banco de dados. Os repositórios (`AlunoRepository`, `UsuarioRepository`) mantêm os dados em arrays no escopo do módulo, o que significa que tudo é perdido ao reiniciar o servidor.

Ao subir, a aplicação lê `alunos.json` (e `usuarios.json`, se existir) e popula os repositórios via `seed()`.

### Autenticação

O registro salva a senha com hash bcrypt (salt 10). O login compara o hash e, se válido, retorna um JWT assinado com `JWT_SECRET` e validade de 1 hora.

Nas rotas protegidas, o middleware `authMiddleware` valida o token do header `Authorization: Bearer <token>`, diferenciando token ausente (401), expirado (401) e inválido (403).

### Validação

O middleware `validate` recebe um schema Zod e valida o `req.body` antes de chegar no controller. Se inválido, retorna 400 com as mensagens de erro concatenadas.

### Rotas

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/register` | Não | Registra usuário |
| POST | `/login` | Não | Retorna JWT |
| GET | `/alunos` | Sim | Lista todos os alunos |
| GET | `/alunos/medias` | Sim | Nome e média de cada aluno |
| GET | `/alunos/aprovados` | Sim | Nome e status (aprovado/reprovado) |
| GET | `/alunos/:id` | Sim | Busca aluno por ID |
| POST | `/alunos` | Sim | Cria aluno |
| PUT | `/alunos/:id` | Sim | Atualiza aluno |
| DELETE | `/alunos/:id` | Sim | Remove aluno |

A média é calculada como `(nota1 + nota2) / 2`. O critério de aprovação é média >= 6.

## Testando com Bruno

A coleção de requisições está na pasta `bruno_config/`. Para importar, abra o Bruno, clique em "Open Collection" e selecione essa pasta.

Depois de importar, ative o ambiente `prw2_escola` (canto superior direito). Ele já tem `base_url` apontando para `http://localhost:3000` e uma variável `jwt_token` que é preenchida automaticamente.

Para autenticar, basta executar a requisição "Logar usuário" uma vez. O post script do Bruno extrai o token da resposta e salva em `jwt_token`. A partir daí, todas as outras requisições já enviam o Bearer token automaticamente, sem precisar copiar e colar nada.

---

Feito por João Vitor Piovezan e Marcos Vinicius Narçay Stanquini
