import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api/usuarios'; // Altere para o IP do seu servidor

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);

  // Formata CPF conforme digita
  const formatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 11) {
      setCpf(numeros);
    }
  };

  // Valida campos
  const validarCampos = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Erro', 'Email inválido');
      return false;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'Senha deve ter no mínimo 6 caracteres');
      return false;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'Senhas não conferem');
      return false;
    }
    if (cpf.length !== 11) {
      Alert.alert('Erro', 'CPF deve ter 11 dígitos');
      return false;
    }
    if (!matricula.trim()) {
      Alert.alert('Erro', 'Matrícula é obrigatória');
      return false;
    }
    return true;
  };

  // Cadastrar usuário
  const handleCadastro = async () => {
    if (!validarCampos()) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          senha,
          cpf,
          matricula: matricula.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva token e dados do usuário
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));

        Alert.alert(
          'Sucesso!',
          'Cadastro realizado com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Home'), // Navega para tela principal
            },
          ]
        );
      } else {
        Alert.alert('Erro', data.error || 'Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro CBMPE</Text>
          <Text style={styles.subtitle}>Crie sua conta</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu.email@cbmpe.gov.br"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="12345678901"
              value={cpf}
              onChangeText={formatarCPF}
              keyboardType="numeric"
              maxLength={11}
            />
            <Text style={styles.helper}>Apenas números</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Matrícula</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua matrícula"
              value={matricula}
              onChangeText={setMatricula}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a senha novamente"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCadastro}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>
              Já tem uma conta? <Text style={styles.linkTextBold}>Fazer login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  helper: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#64748B',
  },
  linkTextBold: {
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
});
