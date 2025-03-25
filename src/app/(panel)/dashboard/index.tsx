import { View, FlatList, Text, Alert } from 'react-native';
import styles from './styles';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';
import {PhotoComponent, Timeline} from '@/components/timeline';
import { useState, useEffect } from 'react';
import api from '@/src/services/api';

export default function Dashboard() {

    const [saudacao, setSaudacao] = useState('');
    const [data, setData] = useState<UserData | null>(null); // Tipando o estado
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/user')
            .then((response) => {
                console.log('Resposta da API:', response.data); // Exibe a resposta no console
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    // O servidor respondeu com um código de status fora do intervalo 2xx
                    console.error('Erro de resposta:', error.response.data);
                    Alert.alert(
                        'Erro',
                        error.response.data.message || 'Erro ao processar a requisição.',
                        [{ text: 'OK' }]
                    );
                } else if (error.request) {
                    // A requisição foi feita, mas nenhuma resposta foi recebida
                    console.error('Erro de rede:', error.request);
                    Alert.alert(
                        'Erro de Rede',
                        'Verifique sua conexão com a internet.',
                        [{ text: 'OK' }]
                    );
                } else {
                    // Algum erro aconteceu ao configurar a requisição
                    console.error('Erro de requisição:', error.message);
                    Alert.alert(
                        'Erro',
                        'Erro ao processar a requisição.',
                        [{ text: 'OK' }]
                    );
                }
            });
    }, []);

    useEffect(() => {
        const obterSaudacao = () => {
            const hora = new Date().getHours();
            if (hora >= 5 && hora < 12) {
                return "Bom dia! ☀️";
            } else if (hora >= 12 && hora < 18) {
                return "Boa tarde! 🌤️";
            } else {
                return "Boa noite! 🌙";
            }
        };

        setSaudacao(obterSaudacao());
    }, []);

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (error) {
        return <Text>Erro: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Header admin={false} />
            <View style={styles.content}>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{saudacao}</Text>
                <Text>Bem-vindo ao Dashboard</Text>                
                {data && (
                    <Text>Olá {data.firstName} {data.lastName}</Text>
                )}
            </View>
            <Navbar />
        </View>
    );
}