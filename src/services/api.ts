// services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/environments';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor de requisição
api.interceptors.request.use(
  async (config) => {
      // Obtém o token salvo no AsyncStorage (ou outro local onde você armazena o token)
      const token = await AsyncStorage.getItem('accessToken');

      // Obtém o idioma preferido do usuário (pode ser salvo no AsyncStorage ou obtido de outra forma)
      const language = await AsyncStorage.getItem('userLanguage') || 'pt-BR'; // Valor padrão 'pt-BR'

      // Adiciona os headers à requisição
      if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Adiciona o Bearer Token
      }
      config.headers['Accept-Language'] = language; // Adiciona o idioma

      return config;
  },
  (error) => {
      // Trata erros na configuração da requisição
      return Promise.reject(error);
  }
);

// Interceptor de resposta (opcional, para tratar erros comuns)
api.interceptors.response.use(
  (response) => {
      // Retorna a resposta diretamente se tudo estiver OK
      return response;
  },
  async (error) => {
      // Trata erros de resposta
      if (error.response) {
          if (error.response.status === 401) {
              // Token expirado ou inválido
              Alert.alert('Sessão expirada', 'Por favor, faça login novamente.', [
                  { text: 'OK', onPress: () => {
                      // Redireciona para a tela de login ou remove o token
                      AsyncStorage.removeItem('accessToken');
                      // Exemplo: navegar para a tela de login (depende da sua navegação)
                      // navigation.navigate('Login');
                  }},
              ]);
          } else if (error.response.status === 500) {
              // Erro interno do servidor
              Alert.alert('Erro', 'Ocorreu um erro no servidor. Tente novamente mais tarde.', [
                  { text: 'OK' },
              ]);
          }
      } else if (error.request) {
          // A requisição foi feita, mas não houve resposta
          Alert.alert('Erro de rede', 'Verifique sua conexão com a internet.', [
              { text: 'OK' },
          ]);
      } else {
          // Outros erros
          Alert.alert('Erro', 'Ocorreu um erro ao processar a requisição.', [
              { text: 'OK' },
          ]);
      }

      return Promise.reject(error);
  }
);

export default api;