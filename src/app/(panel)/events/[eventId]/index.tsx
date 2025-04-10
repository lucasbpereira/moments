import { View, Text, StyleSheet, Pressable, ScrollView, Alert, Image, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { globalStyles } from '@/src/styles';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';
import { UserData } from '@/src/@types/user';
import { EventData } from '@/src/@types/event';
import ParticipantItem from '@/components/participantItem';
import { parseQueryParams } from 'expo-router/build/fork/getStateFromPath-forks';
import { Timeline } from '@/components/timeline';

export type PhotoComponent = {
    id: string
    fileUrl: string
    mediaType: string
    caption: string
    createdAt: string
    likesCount: number
    ownerName: string
    ownerId: string
}

export default function EventDetails() {
  const { eventId } = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [photoList, setPhotoList] = useState<any | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  useEffect(() => {
    api.get('/user')
            .then((response) => {
                setUser(response.data)
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

    const fetchEvent = async () => {
      try {
        const response = await api.get(`/event/${eventId}`);
        setEvent(response.data);
        
    } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do evento');
        console.error(JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();

    const fetchPhotos = async () => {
        try {
          console.log(eventId)
          const response = await api.get(`/events/${eventId}/media`);
          setPhotoList(response.data.content);
          console.log(response.data.content)
      } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar os detalhes do evento');
          console.error(JSON.stringify(error));
        } finally {
          setLoading(false);
        }
      };
  
      fetchPhotos();
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Evento não encontrado</Text>
        <Pressable 
          onPress={() => router.back()} 
          style={globalStyles.button}
        >
          <Text style={globalStyles.textButton}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  // Formatações
  const formattedDate = new Date(event.eventDate + 'T00:00:00').toLocaleDateString('pt-BR');
  const formattedTime = event.eventTime.substring(0, 5);
  const participantsInfo = event.maxParticipants && event.maxParticipants > 0 
    ? `${event.minParticipants} participantes`
    : 'Sem limite de participantes';

    const confirmPresence = async () => {
      api.put(`/event/${eventId}/confirmPresence`, null, {
        params: {confirmed: true}
      })
            .then((response) => {
                setUser(response.data)
                setLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    // O servidor respondeu com um código de status fora do intervalo 2xx
                    console.error('Erro de resposta:', JSON.stringify(error.status));
                    
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
    };


  return (
    <View style={styles.container}>
      <Header admin={false} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Data:</Text>
          <Text style={styles.detailValue}>{formattedDate}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hora:</Text>
          <Text style={styles.detailValue}>{formattedTime}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Local:</Text>
          <Text style={styles.detailValue}>{event.location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Participantes:</Text>
          <Text style={styles.detailValue}>{participantsInfo}</Text>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Descrição:</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
        {/* {event.participantList.length} */}
        {event.participantsList && event.participantsList.length > 0 ? (
            <View>
                <FlatList
                data={event.participantsList}
                renderItem={({ item }) => <ParticipantItem participant={item} />}
                keyExtractor={(item) => item.email}
                scrollEnabled={false} // Pois já está dentro de um ScrollView
                contentContainerStyle={styles.participantsList}
                />
                <FlatList 
                data={photoList}
                keyExtractor={(item:PhotoComponent) => item.id}
                renderItem={({ item }) => (
                    <Timeline 
                    id={item.id}
                    fileUrl={item.fileUrl}
                    mediaType={item.mediaType}
                    caption={item.caption}
                    createdAt={item.createdAt}
                    likesCount={item.likesCount}
                    ownerName={item.ownerName}
                    ownerId={item.ownerId}
                    
                />
            )}
        />
            </View>
            
        ) : (
            <Text style={styles.noParticipants}>Nenhum participante confirmado ainda</Text>
        )}
        
        {
          (!event.creator_id) && (
          <Pressable 
            onPress={() => confirmPresence()} 
            style={globalStyles.button}
          >
              {(!event.creator_id) && <Text style={globalStyles.textButton}>  Confirmar Presença </Text>}
          </Pressable>
          )
        }

       
      </ScrollView>
      
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 100,
    color: '#555',
  },
  detailValue: {
    flex: 1,
    color: '#333',
  },
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  descriptionLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  description: {
    color: '#333',
    lineHeight: 22,
  },
  participantsList: {
    gap: 12,
  },
  noParticipants: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
});