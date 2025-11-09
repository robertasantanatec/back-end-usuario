# 🚒 Backend CBMPE - Sistema de Cadastro de Usuários

Sistema completo de autenticação e cadastro de usuários para o App de Ocorrências da CBMPE.

## 📋 Funcionalidades

✅ Cadastro de usuário com validação  
✅ Login com JWT (JSON Web Token)  
✅ Autenticação e proteção de rotas  
✅ Hash de senha com bcrypt  
✅ Validação de CPF e email únicos  
✅ Atualização de dados do usuário  
✅ Alteração de senha  
✅ Desativação de usuário (soft delete)  
✅ Listagem de usuários  

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **MongoDB** + **Mongoose** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **CORS** - Segurança

## 📦 Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=mongodb://localhost:27017/cbmpe
JWT_SECRET=sua_chave_secreta_super_segura_aqui
PORT=3000
NODE_ENV=development
```

### 3. Iniciar servidor

**Modo desenvolvimento (com hot reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm run build
npm start
```

## 🌐 Endpoints da API

### Base URL
```
http://localhost:3000/api/usuarios
```

---

### 📝 **POST /cadastro** - Cadastrar Usuário

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@cbmpe.gov.br",
  "senha": "senha123",
  "cpf": "12345678901",
  "matricula": "2024001"
}
```

**Response (201):**
```json
{
  "usuario": {
    "id": "abc123",
    "nome": "João Silva",
    "email": "joao@cbmpe.gov.br",
    "cpf": "12345678901",
    "matricula": "2024001",
    "dataCadastro": "2025-11-08T23:00:00.000Z",
    "ativo": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Usuário cadastrado com sucesso"
}
```

---

### 🔐 **POST /login** - Login

**Body:**
```json
{
  "email": "joao@cbmpe.gov.br",
  "senha": "senha123"
}
```

**Response (200):**
```json
{
  "usuario": {
    "id": "abc123",
    "nome": "João Silva",
    "email": "joao@cbmpe.gov.br",
    "cpf": "12345678901",
    "matricula": "2024001",
    "dataCadastro": "2025-11-08T23:00:00.000Z",
    "ativo": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login realizado com sucesso"
}
```

---

### 👤 **GET /perfil** - Obter Perfil do Usuário Autenticado
*Requer autenticação*

**Headers:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Response (200):**
```json
{
  "id": "abc123",
  "nome": "João Silva",
  "email": "joao@cbmpe.gov.br",
  "cpf": "12345678901",
  "matricula": "2024001",
  "dataCadastro": "2025-11-08T23:00:00.000Z",
  "ativo": true
}
```

---

### 📋 **GET /listar** - Listar Todos os Usuários
*Requer autenticação*

**Headers:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Response (200):**
```json
[
  {
    "id": "abc123",
    "nome": "João Silva",
    "email": "joao@cbmpe.gov.br",
    "cpf": "12345678901",
    "matricula": "2024001",
    "dataCadastro": "2025-11-08T23:00:00.000Z",
    "ativo": true
  }
]
```

---

### 🔍 **GET /:id** - Buscar Usuário por ID
*Requer autenticação*

**Headers:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Response (200):**
```json
{
  "id": "abc123",
  "nome": "João Silva",
  "email": "joao@cbmpe.gov.br",
  "cpf": "12345678901",
  "matricula": "2024001",
  "dataCadastro": "2025-11-08T23:00:00.000Z",
  "ativo": true
}
```

---

### ✏️ **PUT /atualizar** - Atualizar Dados do Usuário
*Requer autenticação*

**Headers:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Body:**
```json
{
  "id": "abc123",
  "nome": "João Silva Santos",
  "email": "joao.silva@cbmpe.gov.br"
}
```

**Response (200):**
```json
{
  "usuario": {
    "id": "abc123",
    "nome": "João Silva Santos",
    "email": "joao.silva@cbmpe.gov.br",
    "cpf": "12345678901",
    "matricula": "2024001",
    "dataCadastro": "2025-11-08T23:00:00.000Z",
    "ativo": true
  },
  "message": "Usuário atualizado com sucesso"
}
```

---

### 🔑 **PUT /alterar-senha** - Alterar Senha
*Requer autenticação*

**Headers:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Body:**
```json
{
  "id": "abc123",
  "senhaAtual": "senha123",
  "novaSenha": "novaSenha456"
}
```

**Response (200):**
```json
{
  "message": "Senha alterada com sucesso"
}
```

---

### ❌ **DELETE /:id** - Desativar Usuário
*Requer autenticação*

**Headers:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Response (200):**
```json
{
  "message": "Usuário desativado com sucesso"
}
```

---

## 🔒 Autenticação

Todas as rotas protegidas requerem um token JWT no header:

```
Authorization: Bearer SEU_TOKEN_JWT_AQUI
```

O token é retornado nos endpoints `/cadastro` e `/login` e tem validade de **7 dias**.

## 📱 Integração com React Native

### Exemplo de cadastro:

```javascript
const cadastrar = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: 'João Silva',
        email: 'joao@cbmpe.gov.br',
        senha: 'senha123',
        cpf: '12345678901',
        matricula: '2024001'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      // Salvar token para usar em requisições futuras
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));
      console.log('Cadastro realizado!');
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
  }
};
```

### Exemplo de login:

```javascript
const login = async (email, senha) => {
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();
    
    if (response.ok) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));
      console.log('Login realizado!');
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
};
```

### Exemplo de requisição autenticada:

```javascript
const obterPerfil = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const response = await fetch('http://localhost:3000/api/usuarios/perfil', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('Perfil:', data);
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
  }
};
```

## 🧪 Testando com Postman/Insomnia

1. **Cadastrar usuário:**
   - POST `http://localhost:3000/api/usuarios/cadastro`
   - Body: JSON com dados do usuário

2. **Fazer login:**
   - POST `http://localhost:3000/api/usuarios/login`
   - Body: JSON com email e senha
   - Copiar o `token` da resposta

3. **Acessar rotas protegidas:**
   - Adicionar header: `Authorization: Bearer SEU_TOKEN`
   - Fazer requisições normalmente

## ⚠️ Validações Implementadas

- ✅ Email único e formato válido
- ✅ CPF único e com 11 dígitos
- ✅ Matrícula única
- ✅ Senha com mínimo 6 caracteres
- ✅ Todos os campos obrigatórios no cadastro
- ✅ Token JWT válido para rotas protegidas

## 🚀 Próximos Passos

Para integrar no seu projeto:

1. Copie todos os arquivos da pasta `src/` para o seu backend
2. Instale as dependências: `npm install bcryptjs @types/bcryptjs jsonwebtoken @types/jsonwebtoken`
3. Configure as variáveis de ambiente no `.env`
4. Importe as rotas no seu `index.ts` principal
5. Teste os endpoints com Postman/Insomnia
6. Integre com seu app React Native

## 📝 Notas Importantes

- **Senha:** Nunca retorna no JSON por padrão (campo com `select: false`)
- **Token:** Expira em 7 dias (configurável em `jwtUtils.ts`)
- **CPF:** Automaticamente remove formatação (pontos e traços)
- **Desativar:** Soft delete (usuário não é deletado, apenas marcado como inativo)

## 🤝 Suporte

Qualquer dúvida sobre implementação, pode me chamar! 😊
