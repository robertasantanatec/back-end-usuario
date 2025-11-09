import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api'; // Altere para o IP do seu servidor

/**
 * Service para fazer requisições autenticadas à API
 */
class ApiService {
  /**
   * Obter token salvo
   */
  async getToken() {
    return await AsyncStorage.getItem('token');
  }

  /**
   * Obter dados do usuário logado
   */
  async getUsuario() {
    const usuarioString = await AsyncStorage.getItem('usuario');
    return usuarioString ? JSON.parse(usuarioString) : null;
  }

  /**
   * Fazer logout (limpar dados salvos)
   */
  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('usuario');
  }

  /**
   * Requisição GET autenticada
   */
  async get(endpoint) {
    const token = await this.getToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }

    return data;
  }

  /**
   * Requisição POST autenticada
   */
  async post(endpoint, body) {
    const token = await this.getToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }

    return data;
  }

  /**
   * Requisição PUT autenticada
   */
  async put(endpoint, body) {
    const token = await this.getToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }

    return data;
  }

  /**
   * Requisição DELETE autenticada
   */
  async delete(endpoint) {
    const token = await this.getToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }

    return data;
  }

  // ===== MÉTODOS ESPECÍFICOS DE USUÁRIO =====

  /**
   * Cadastrar novo usuário
   */
  async cadastrar(dados) {
    const response = await fetch(`${API_URL}/usuarios/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao cadastrar');
    }

    // Salva token e usuário
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));

    return data;
  }

  /**
   * Fazer login
   */
  async login(email, senha) {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao fazer login');
    }

    // Salva token e usuário
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));

    return data;
  }

  /**
   * Obter perfil do usuário autenticado
   */
  async obterPerfil() {
    return await this.get('/usuarios/perfil');
  }

  /**
   * Atualizar dados do usuário
   */
  async atualizarUsuario(id, dados) {
    return await this.put('/usuarios/atualizar', { id, ...dados });
  }

  /**
   * Alterar senha
   */
  async alterarSenha(id, senhaAtual, novaSenha) {
    return await this.put('/usuarios/alterar-senha', {
      id,
      senhaAtual,
      novaSenha,
    });
  }

  // ===== MÉTODOS DE OCORRÊNCIA =====

  /**
   * Criar nova ocorrência
   */
  async criarOcorrencia(dados) {
    return await this.post('/ocorrencias', dados);
  }

  /**
   * Listar ocorrências
   */
  async listarOcorrencias() {
    return await this.get('/ocorrencias');
  }

  /**
   * Buscar ocorrência por ID
   */
  async buscarOcorrencia(id) {
    return await this.get(`/ocorrencias/${id}`);
  }

  /**
   * Editar ocorrência
   */
  async editarOcorrencia(dados) {
    return await this.put('/ocorrencias/editar', dados);
  }

  /**
   * Finalizar ocorrência
   */
  async finalizarOcorrencia(id) {
    return await this.put('/ocorrencias/finalizar', { id });
  }

  /**
   * Excluir ocorrência
   */
  async excluirOcorrencia(id) {
    return await this.delete(`/ocorrencias/${id}`);
  }
}

// Exporta instância única (singleton)
export default new ApiService();
