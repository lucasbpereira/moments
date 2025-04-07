import { View, Text, StyleSheet, Pressable, ScrollView, Alert, Image, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import api from '@/src/services/api';
import { globalStyles } from '@/src/styles';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';
import { UserData } from '@/src/@types/user';
import { EventData } from '@/src/@types/event';
import ParticipantItem from '@/components/participantItem';
import { parseQueryParams } from 'expo-router/build/fork/getStateFromPath-forks';
import { Camera, CameraDevice, useCameraDevice, useCameraDevices, useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import * as MediaLibrary from "expo-media-library";
import { Flash, FlashOff, ArrowEmailForward, RotateCameraLeft, RotateCameraRight } from 'iconoir-react-native';
import { Video, ResizeMode } from "expo-av";
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar';

const { width: widthScreen, height: heightScreen } = Dimensions.get("screen");

export default function EventDetails() {
  const { eventId } = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const [cameraType, setCameraType] = useState<"back" | "front">("back");
  const devices = useCameraDevices();
  const device: CameraDevice | undefined = devices.find((d) => d.position === cameraType);
  
  const { hasPermission, requestPermission } = useCameraPermission();
  const { hasPermission: hasMicPermission, requestPermission: requestMicPermission } = useMicrophonePermission();

  const [permission, setPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState<"photo" | "video">("photo"); // Alterna entre modos
  const cameraRef = useRef<Camera>(null);
  const [isFlashOn, setIsFlashOn] = useState(false); // Estado para o flash

  useEffect(() => {
    api.get('/user')
            .then((response) => {
                setUser(response.data)
                fetchEvent(response.data);
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

    const fetchEvent = async (userLogged: UserData | null) => {
      console.log(userLogged);
      try {
        const response = await api.get(`/event/${eventId}`);
        setEvent(response.data);
        event?.participantsList.find((obj) => {
          console.warn(obj.phone, userLogged?.phone)
          if(obj.phone === userLogged?.phone) {
            console.log(obj)
          }
        });
        // setHasConfirmed(confirmed ? true : false)
        // console.log(confirmed ? true : false)
        // console.log(confirmed)
    } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do evento');
        console.error(JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    };

    
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
  const formattedDate = new Date(event.eventDate).toLocaleDateString('pt-BR');
  const formattedTime = event.eventTime.substring(0, 5);
  const participantsInfo = event.maxParticipants && event.maxParticipants > 0 
    ? `${event.minParticipants}-${event.maxParticipants} participantes`
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


    useEffect(() => {
      (async () => {
          const cameraStatus = await requestPermission();
          const micStatus = await requestMicPermission();

          if (cameraStatus && micStatus) {
              setPermission(true);
          }
      })();
  }, []);

  const takePhoto = async () => {
      if (!cameraRef.current || !device) return;

      try {
          const photo = await cameraRef.current.takePhoto();
          console.log("Foto capturada:", photo);

          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status !== "granted") {
              console.log("Permissão para Media Library não concedida!");
              setPermission(false);
              return;
          }

          await MediaLibrary.createAssetAsync(photo.path);
          console.log("Foto salva com sucesso:", photo.path);
      } catch (error) {
          console.log("Erro ao capturar ou salvar foto:", error);
      }
  };

  const startRecording = () => {
      if (!cameraRef.current || !device) return;

      setIsRecording(true);
      cameraRef.current.startRecording({
          onRecordingFinished: (video) => {
              console.log("Vídeo gravado a:", video);
              setVideoUri(video.path);
              setIsRecording(false);
              setModalVisible(true);
          },
          onRecordingError: (error) => {
              console.log("Erro ao gravar vídeo:", error);
          },
      });
  };

  const stopRecording = async () => {
      if (cameraRef.current) {
          await cameraRef.current.stopRecording();
          setIsRecording(false);
      }
  };

  const handleSaveVideo = async () => {
      if (videoUri) {
          try {
              await MediaLibrary.createAssetAsync(videoUri);
              console.log("Vídeo salvo com sucesso");
              setVideoUri(null);
          } catch (error) {
              console.log("Erro ao salvar vídeo:", error);
          }
      }
  };

  const handleModeSwitch = (selectedMode: "photo" | "video") => {
      setMode(selectedMode);
  };

  if (permission === null) return <View />;
  if (!device) return <View />;

  if (device == null) {
      return <Text>Carregando câmera...</Text>;
  }

  const toggleCameraType = () => {
      console.log(cameraType)
      setCameraType((prevType) => (prevType === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
      setIsFlashOn((prev) => !prev);
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
        {event.participant && (
          event.participantsList && event.participantsList.length > 0 ? (
              <FlatList
              data={event.participantsList}
              renderItem={({ item }) => <ParticipantItem participant={item} />}
              keyExtractor={(item) => item.email}
              scrollEnabled={false} // Pois já está dentro de um ScrollView
              contentContainerStyle={styles.participantsList}
              />
          ) : (
              <Text style={styles.noParticipants}>Nenhum participante confirmado ainda</Text>
          )
        )}

        {(hasConfirmed) && (
            <Pressable 
              onPress={() => confirmPresence()} 
              style={globalStyles.button}
            >
                {(!event.creator_id) && <Text style={globalStyles.textButton}>  Confirmar Presença </Text>}
            </Pressable>
        )}

<View style={styles.container}>
            <StatusBar hidden />
            
            <Camera
                style={StyleSheet.absoluteFill}
                ref={cameraRef}
                device={device}
                isActive={true}
                video={mode === "video"}
                photo={mode === "photo"}
                audio={mode === "video"}
                resizeMode="cover"
                torch={isFlashOn ? 'on' : 'off'}
            />

            <View style={styles.modeSwitchContainer}>
                
                <TouchableOpacity
                    style={[styles.modeButton, mode === "photo" && styles.activeMode]}
                    onPress={() => handleModeSwitch("photo")}
                >
                    <Text style={styles.modeText}>Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.modeButton, mode === "video" && styles.activeMode]}
                    onPress={() => handleModeSwitch("video")}
                >
                    <Text style={styles.modeText}>Vídeo</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.toggleCameraType} onPress={toggleCameraType}>
                <Text style={styles.buttonText}>
                    {
                        cameraType === 'back' ? <RotateCameraLeft color="white" height={32} width={32} /> : <RotateCameraRight color="white" height={32} width={32} />
                    }
                    
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleFlash} onPress={toggleFlash}>
                <Text style={styles.buttonText}>
                    {isFlashOn ? <FlashOff color="white" height={32} width={32} /> : <Flash color="white" height={32} width={32} />}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutCamera}  onPress={() => router.back()}>
                <ArrowEmailForward color="white" height={32} width={32} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={mode === "photo" ? takePhoto : isRecording ? stopRecording : startRecording}
                style={styles.captureButton}
            >
            </TouchableOpacity>
            
            {videoUri && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.videoContainer}>
                        <Video
                            source={{ uri: videoUri }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            shouldPlay
                            isLooping
                            resizeMode={ResizeMode.COVER}
                            style={{ width: widthScreen, height: heightScreen }}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: "#000" }}>Fechar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleSaveVideo}>
                            <Text style={{ color: "#000" }}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
      </ScrollView>
      
      <Navbar />
    </View>
  );
}

