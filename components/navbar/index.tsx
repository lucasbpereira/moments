import { View, TouchableOpacity, Alert } from 'react-native';
import {styles} from './styles';
import { Feather } from '@expo/vector-icons';
import {colors} from '@/constants/Colors'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        console.log("SAIR")
        try {
          await AsyncStorage.removeItem('accessToken'); // Remove o token
          router.replace('/(auth)/signin'); // Redireciona para a página de login
        } catch (error) {
          Alert.alert('Erro', 'Falha ao fazer logout.');
        }
      };

      
    return (
        <View style={styles.navbar}>
            <TouchableOpacity>
                <Feather name="home" size={24} color={colors.gray[950]} onPress={() => router.push('/dashboard')}></Feather> />
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="search" size={24} color={colors.gray[950]} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="camera" size={24} color={colors.gray[950]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/events')}>
                <Feather name="calendar" size={24} color={colors.gray[950]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
                <Feather name="user" size={24} color={colors.gray[950]} />
            </TouchableOpacity>
        </View>
    )
}