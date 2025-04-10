import { View, TouchableOpacity, Alert, Text } from 'react-native';
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
                <Text>
                    <Feather name="home" size={24} color={colors.gray[950]} onPress={() => router.push('/dashboard')} />
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>
                    <Feather name="search" size={24} color={colors.gray[950]} />
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/camera')}>
                <Feather name="camera" size={24} color={colors.gray[950]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/events')}>
                <Text>
                    <Feather name="calendar" size={24} color={colors.gray[950]} />
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
                <Text>
                    <Feather name="user" size={24} color={colors.gray[950]} />
                </Text>
            </TouchableOpacity>
        </View>
    )
}