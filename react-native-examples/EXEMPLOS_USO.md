# 📱 Exemplos de Uso - React Native

## 🚀 Como usar o ApiService

O `apiService.js` facilita todas as chamadas à API com autenticação automática.

### Instalação de dependências necessárias

```bash
npm install @react-native-async-storage/async-storage
```

---

## 📝 Exemplos de Uso

### 1. **Cadastro de Usuário**

```javascript
import ApiService from './services/apiService';
import { Alert } from 'react-native';

const handleCadastro = async () => {
  try {
    const resultado = await ApiService.cadastrar({
      nome: 'João Silva',
      email: 'joao@cbmpe.gov.br',
      senha: 'senha123',
      cpf: '12345678901',
      matricula: '2024001'
    });

    Alert.alert('Sucesso', 'Cadastro realizado!');
    // Token e usuário já foram salvos automaticamente
    navigation.replace('Home');
  } catch (error) {
    Alert.alert('Erro', error.message);
  }
};
```

---

### 2. **Login**

```javascript
import ApiService from './services/apiService';

const handleLogin = async (email, senha) => {
  try {
    const resultado = await ApiService.login(email, senha);
    
    console.log('Usuário logado:', resultado.usuario);
    // Token e usuário já foram salvos automaticamente
    navigation.replace('Home');
  } catch (error) {
    Alert.alert('Erro', error.message);
  }
};
```

---

### 3. **Obter Perfil do Usuário Logado**

```javascript
import ApiService from './services/apiService';
import { useEffect, useState } from 'react';

function PerfilScreen() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const perfil = await ApiService.obterPerfil();
      setUsuario(perfil);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View>
      {usuario && (
        <>
          <Text>Nome: {usuario.nome}</Text>
          <Text>Email: {usuario.email}</Text>
          <Text>Matrícula: {usuario.matricula}</Text>
        </>
      )}
    </View>
  );
}
```

---

### 4. **Criar Ocorrência**

```javascript
import ApiService from './services/apiService';

const criarNovaOcorrencia = async () => {
  try {
    const ocorrencia = await ApiService.criarOcorrencia({
      NomeCompleto: 'Maria Santos',
      Telefone1: '81999887766',
      Telefone2: '81988776655',
      Obs: 'Urgente - verificar equipamento',
      TipoOcorrencia: 'Manutenção',
      EquipeAssociada: 'Equipe B'
    });

    Alert.alert('Sucesso', 'Ocorrência criada!');
    console.log('ID:', ocorrencia.id);
  } catch (error) {
    Alert.alert('Erro', error.message);
  }
};
```

---

### 5. **Listar Ocorrências**

```javascript
import ApiService from './services/apiService';
import { useEffect, useState } from 'react';

function OcorrenciasScreen() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarOcorrencias();
  }, []);

  const carregarOcorrencias = async () => {
    try {
      const lista = await ApiService.listarOcorrencias();
      setOcorrencias(lista);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={ocorrencias}
      renderItem={({ item }) => (
        <View>
          <Text>{item.TipoOcorrencia}</Text>
          <Text>{item.NomeCompleto}</Text>
          <Text>Status: {item.Status}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
```

---

### 6. **Atualizar Dados do Usuário**

```javascript
import ApiService from './services/apiService';

const atualizarDados = async (userId) => {
  try {
    const resultado = await ApiService.atualizarUsuario(userId, {
      nome: 'João Silva Santos',
      email: 'joao.silva@cbmpe.gov.br'
    });

    Alert.alert('Sucesso', 'Dados atualizados!');
  } catch (error) {
    Alert.alert('Erro', error.message);
  }
};
```

---

### 7. **Alterar Senha**

```javascript
import ApiService from './services/apiService';

const alterarSenha = async (userId, senhaAtual, novaSenha) => {
  try {
    await ApiService.alterarSenha(userId, senhaAtual, novaSenha);
    Alert.alert('Sucesso', 'Senha alterada com sucesso!');
  } catch (error) {
    Alert.alert('Erro', error.message);
  }
};
```

---

### 8. **Logout**

```javascript
import ApiService from './services/apiService';

const handleLogout = async () => {
  try {
    await ApiService.logout();
    navigation.replace('Login');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};
```

---

### 9. **Verificar se Usuário Está Logado**

```javascript
import ApiService from './services/apiService';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    verificarLogin();
  }, []);

  const verificarLogin = async () => {
    const token = await ApiService.getToken();
    const usuario = await ApiService.getUsuario();

    if (token && usuario) {
      // Usuário está logado
      navigation.replace('Home');
    } else {
      // Usuário não está logado
      navigation.replace('Login');
    }
  };

  return <LoadingScreen />;
}
```

---

### 10. **Tratamento de Erro Global**

```javascript
import ApiService from './services/apiService';

const fazerRequisicao = async () => {
  try {
    const resultado = await ApiService.obterPerfil();
    // Sucesso
  } catch (error) {
    // Trata erros específicos
    if (error.message.includes('Token inválido')) {
      // Token expirado - fazer logout
      await ApiService.logout();
      navigation.replace('Login');
      Alert.alert('Sessão expirada', 'Faça login novamente');
    } else if (error.message.includes('não encontrado')) {
      Alert.alert('Erro', 'Recurso não encontrado');
    } else if (error.message.includes('conectar')) {
      Alert.alert('Erro', 'Verifique sua conexão com a internet');
    } else {
      Alert.alert('Erro', error.message);
    }
  }
};
```

---

## 🎯 Dicas Importantes

1. **Sempre use try/catch** em todas as chamadas à API
2. **O ApiService já gerencia o token automaticamente** - você não precisa se preocupar com isso
3. **Token expira em 7 dias** - implemente refresh ou faça logout automático
4. **Altere o `API_URL`** no `apiService.js` para o IP do seu servidor
5. **Use `await`** em todas as chamadas (são assíncronas)

---

## 🔧 Configuração do IP do Servidor

### Para desenvolvimento local:

```javascript
// Se estiver usando emulador Android
const API_URL = 'http://10.0.2.2:3000/api';

// Se estiver usando dispositivo físico na mesma rede
const API_URL = 'http://192.168.1.100:3000/api'; // Use o IP da sua máquina

// Se estiver usando Expo
const API_URL = 'http://SEU_IP_LOCAL:3000/api';
```

Para descobrir seu IP:
- **Windows**: `ipconfig` no CMD
- **Mac/Linux**: `ifconfig` no Terminal

---

## 📦 Estrutura de Arquivos Sugerida

```
src/
├── screens/
│   ├── LoginScreen.jsx
│   ├── CadastroScreen.jsx
│   ├── HomeScreen.jsx
│   └── PerfilScreen.jsx
├── services/
│   └── apiService.js
└── App.js
```

---

## 🚀 Próximos Passos

1. Copie os arquivos de exemplo para seu projeto
2. Instale o AsyncStorage: `npm install @react-native-async-storage/async-storage`
3. Configure o `API_URL` no `apiService.js`
4. Teste o cadastro e login
5. Implemente as outras telas do app

Qualquer dúvida, é só perguntar! 😊
