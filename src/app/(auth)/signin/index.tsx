import { Text, View, Image, TouchableOpacity, TextInput, Alert, Pressable } from 'react-native';
import styles from './styles';
import { globalStyles } from '@/src/styles';
import themes from '@/constants/Colors';
import React, { useState } from 'react';
import { EyeSolid, EyeClosed } from 'iconoir-react-native';
import { Link, router } from 'expo-router';
import api from '@/src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/environments';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Armazena o token no AsyncStorage
    await AsyncStorage.setItem('accessToken', "");
    setLoading(true);
    console.log(email, password)
    try {
      const data = {
        email: email.toLowerCase(),
        password: password,
      };
  
      const response = await api.post(`/auth/login`, data);
  
      console.log('Resposta da API:', response.data);
  
      // Armazena o token no AsyncStorage
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
  
      // Redireciona para a rota do painel
      router.replace('/dashboard');  
  
    } catch (error: unknown) {
      let errorMessage = 'Falha no login. Verifique suas credenciais.';
      
      // Se o erro for um erro de requisição HTTP (Axios)
      if (error instanceof Error) {
        console.error('Erro no login:', error.message);
        errorMessage = error.message;
      }
  
      if ((error as any)?.response?.data?.message) {
        errorMessage = (error as any).response.data.message;
      }
  
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />             
      <View style={styles.content}>  
        <Text style={styles.titleText}>Login</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <View style={globalStyles.passwordContainer}>
          <TextInput
            style={globalStyles.password}
            placeholder="Digite sua senha"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <View>
              {secureText ? <EyeSolid color={themes.light.tabIconDefault} height={32} width={32}/> 
                          : <EyeClosed color={themes.light.tabIconDefault} height={32} width={32}/>}
            </View>
          </TouchableOpacity>
        </View>
        <Pressable style={globalStyles.button} onPress={handleLogin} disabled={loading}>
          <Text style={globalStyles.textButton}>{loading ? 'Entrando...' : 'Entrar'}</Text>
        </Pressable>
        <Link href="/signup">
          <Text>Ainda não possuo conta</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
