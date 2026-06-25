# Sistema de Autenticação com Node.js, React, JWT e MySQL

## 1. Criando o Projeto e Instalando Dependências

### Backend

Inicialize o projeto Node.js:

```bash
npm init -y
```

Instale as dependências principais:

```bash
npm install express bcryptjs jsonwebtoken dotenv express-rate-limit cors mysql2
```

Instale as dependências de desenvolvimento:

```bash
npm install --save-dev nodemon
```

> Caso tenha instalado o PostgreSQL anteriormente, remova-o:

```bash
npm uninstall pg
```

### Frontend

Crie o projeto React utilizando Vite:

```bash
npm create vite@latest frontend -- --template react
```

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Instale React Router e Axios:

```bash
npm install react-router-dom axios
```

---

## 2. Estrutura Recomendada do Projeto

```text
projeto/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.js
```

---

## 3. Configurando Scripts do Backend

No arquivo `package.json`, substitua a seção `scripts` por:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

### Explicação

* `npm run dev` → Executa o servidor com Nodemon (reinicia automaticamente ao salvar alterações).
* `npm start` → Executa o servidor em modo produção.
* `npm test` → Script padrão do Node.js.

---

## 4. Configuração do .gitignore

Crie um arquivo `.gitignore` na raiz do backend:

```gitignore
node_modules/
.env
```

### O que será ignorado?

* `node_modules/` → Dependências instaladas pelo npm.
* `.env` → Variáveis de ambiente e informações sensíveis.

---

## 5. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=auth_db

JWT_SECRET=crie_uma_chave_longa_e_aleatoria_aqui
JWT_EXPIRES_IN=1h
```

### Importante

Como o projeto utiliza **MySQL**, a porta padrão é:

```env
DB_PORT=3306
```

e não `5432` (PostgreSQL).

### Gerando uma chave JWT segura

Execute o comando abaixo no terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copie o valor gerado e utilize-o no campo:

```env
JWT_SECRET=valor_gerado
```

---

## 6. Instalando Dependência CORS

Caso ainda não tenha instalado:

```bash
cd backend
npm install cors
```

No arquivo `server.js`:

```javascript
const cors = require('cors');

app.use(cors());
```

Isso permitirá que o frontend React faça requisições para a API.

---

## 7. Executando o Projeto

### Backend

Dentro da pasta backend:

```bash
npm run dev
```

Saída esperada:

```bash
Servidor rodando na porta 3000
```

### Frontend

Dentro da pasta frontend:

```bash
npm run dev
```

Saída esperada:

```bash
Local: http://localhost:5173/
```

---

## 8. Testando a API pelo Terminal

### Registrar Usuário

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d "{\"name\":\"Arthur\",\"email\":\"arthur@email.com\",\"password\":\"senha123\"}"
```

Resposta esperada:

```json
{
  "message": "Usuário criado com sucesso"
}
```

---

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d "{\"email\":\"arthur@email.com\",\"password\":\"senha123\"}"
```

Resposta esperada:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Guarde o token retornado.

---

### Registrar Outro Usuário

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d "{\"name\":\"Arthur\",\"email\":\"arthur2@email.com\",\"password\":\"senha123\"}"
```

---

## 9. Fluxo de Autenticação

```text
Usuário
   │
   ▼
Registro
   │
   ▼
Senha criptografada (bcrypt)
   │
   ▼
Banco de Dados
   │
   ▼
Login
   │
   ▼
Validação da senha
   │
   ▼
Geração do JWT
   │
   ▼
Token enviado ao Frontend
   │
   ▼
Rotas protegidas
```

---

## 10. Tecnologias Utilizadas

### Backend

* Node.js
* Express.js
* MySQL
* bcryptjs
* JWT (jsonwebtoken)
* dotenv
* express-rate-limit
* cors

### Frontend

* React
* Vite
* React Router DOM
* Axios

---

## 11. Comandos Úteis

Instalar dependências novamente:

```bash
npm install
```

Executar backend:

```bash
npm run dev
```

Executar frontend:

```bash
npm run dev
```

Parar execução:

```bash
CTRL + C
```

Verificar versões:

```bash
node -v
npm -v
```

---

## 12. Checklist Final

✅ Node.js instalado

✅ MySQL configurado

✅ Banco `auth_db` criado

✅ Arquivo `.env` configurado

✅ Dependências instaladas

✅ Backend executando na porta 3000

✅ Frontend executando na porta 5173

✅ Registro funcionando

✅ Login funcionando

✅ JWT sendo gerado corretamente

✅ Comunicação Frontend ↔ Backend funcionando
