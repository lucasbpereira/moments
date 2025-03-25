// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken'); // Busca o token do AsyncStorage
        console.log("O TOKEN É: ", token);
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace('/(auth)/signin'); // Redireciona para a página de login
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
        router.replace('/(auth)/signin');
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading }; // Retorna ambos os estados
}