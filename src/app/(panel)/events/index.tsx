import { View, FlatList, Alert, Text, Pressable } from 'react-native';
import styles from './styles';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';
import {PhotoComponent, Timeline} from '@/components/timeline';
import api from '@/src/services/api';
import { Link, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { EventData } from '@/src/@types/event';
import { globalStyles } from '@/src/styles';
import EventCard from '@/components/eventCard';

export default function Events() {
    const router = useRouter();

    const [saudacao, setSaudacao] = useState('');
    const [data, setData] = useState<EventData[] | null>(null); // Tipando o estado
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/event')
            .then((response) => {
                console.log('Resposta da API:', response.data); // Exibe a resposta no console
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    // O servidor respondeu com um código de status fora do intervalo 2xx
                    console.error('Erro de resposta:', JSON.stringify(error.status));
                    if(error.status === 401) {
                        router.push('/(auth)/signin');
                    }
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
                return "Bom dia, ";
            } else if (hora >= 12 && hora < 18) {
                return "Boa tarde, ";
            } else {
                return "Boa noite, ";
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
                {data && (
                    <View> 
                        <View>
                            <FlatList
                                data={data} // Seu array de eventos
                                renderItem={({ item }) => <EventCard event={item} />}
                                keyExtractor={(item) => item.eventId ?? 'default-key'} // Solução principal
                                ListEmptyComponent={
                                    <View>
                                    <Text>Você não possui participação em nenhum evento no momento</Text>
                                    <Pressable onPress={() => router.push('/events/create')} style={globalStyles.button}>
                                        <Text style={globalStyles.textButton}>Criar evento</Text>
                                    </Pressable>
                                    </View>
                                }
                            />
                        </View>
                    </View>
                )}
                </View>
            <Navbar />
        </View>
    );
    

    // const photoList =  [{
    //         id: '1',
    //         url: 'https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         alt: 'teste',
    //         title: 'É tão fofinho',
    //         likes: 5,
    //         comments: 5,
    //         author: {
    //             id:    '123',
    //             username:  'Lucas Barbosa',
    //             verified:  true,
    //             profile_image: 'teste',
    //         },
    //     },
    //     {
    //         id: '2',
    //         url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         alt: 'teste',
    //         title: 'Dá vontade de apertar',
    //         likes: 5,
    //         comments: 5,
    //         author: {
    //             id:    '123',
    //             username:  'Karina Vieira',
    //             verified:  true,
    //             profile_image: 'teste',
    //         },
    //     }]
    
    
    // // setPhotos(photoList)

    // return (
    //     <View style={styles.container}>
    //         <Header  admin={false}  />
    //         <View style={styles.content}>  
    //             <FlatList 
    //                 data={photoList}
    //                 keyExtractor={(item:PhotoComponent) => item.id}
    //                 renderItem={({ item }) => (
    //                     <Timeline 
    //                     id={item.id}
    //                     url={item.url}
    //                     alt={item.alt}
    //                     title={item.title}
    //                     likes={item.likes}
    //                     comments={item.comments}
    //                     author={item.author}
    //                     />
    //                 )}
    //             />
    //         </View>
    //         <Navbar></Navbar>
    //     </View>
    // )    
}