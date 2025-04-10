import { useEffect, useRef, useState } from "react";
import { 
  StyleSheet, 
  View, 
  StatusBar, 
  TouchableOpacity, 
  Modal, 
  Text, 
  Dimensions, 
  Image, 
  Alert,
  ActivityIndicator,
  FlatList,
  Platform
} from "react-native";
import { 
  Camera, 
  CameraDevice, 
  useCameraDevices, 
  useCameraPermission, 
  useMicrophonePermission 
} from "react-native-vision-camera";
import { Video, ResizeMode } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import { Flash, FlashOff, ArrowEmailForward, RotateCameraLeft, RotateCameraRight } from 'iconoir-react-native';
import { router } from 'expo-router';

import { styles } from './styles';
import api from "@/src/services/api";
import { EventData } from "@/src/@types/event";

type CameraMode = "photo" | "video";
type CameraPosition = "back" | "front";

const SCREEN_DIMENSIONS = Dimensions.get("screen");

export default function CameraScreen() {
  // State initialization
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>("back");
  const [mode, setMode] = useState<CameraMode>("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [permission, setPermission] = useState<boolean | null>(null);
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [showEventSelection, setShowEventSelection] = useState(false);

  // Camera hooks and refs
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === cameraPosition);
  const cameraRef = useRef<Camera>(null);
  
  // Permission hooks
  const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  const { hasPermission: hasMicPermission, requestPermission: requestMicPermission } = useMicrophonePermission();

  // Effects
  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  // Permission handling
  const checkAndRequestPermissions = async () => {
    const cameraStatus = await requestCameraPermission();
    const micStatus = await requestMicPermission();
    setPermission(cameraStatus && micStatus);
  };

  // Camera actions
  const captureMedia = async () => {
    if (mode === "photo") {
      await capturePhoto();
    } else {
      isRecording ? stopVideoRecording() : startVideoRecording();
    }
  };

  const capturePhoto = async () => {
    if (!cameraRef.current || !device) return;

    try {
      const photo = await cameraRef.current.takePhoto();
      await verifyMediaLibraryPermission();
      setMediaUri(photo.path);
      await fetchEvents(); // Busca os eventos antes de mostrar a seleção
      setShowEventSelection(true); // Mostra a seleção de eventos primeiro
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const startVideoRecording = () => {
    if (!cameraRef.current || !device) return;

    setIsRecording(true);
    cameraRef.current.startRecording({
      onRecordingFinished: async (video) => {
        setMediaUri(video.path);
        setIsRecording(false);
        await fetchEvents(); // Busca os eventos antes de mostrar a seleção
        setShowEventSelection(true); // Mostra a seleção de eventos primeiro
      },
      onRecordingError: (error) => {
        console.error("Error recording video:", error);
        setIsRecording(false);
      },
    });
  };

  const stopVideoRecording = async () => {
    if (cameraRef.current) {
      await cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const verifyMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      console.warn("Media Library permission not granted!");
      setPermission(false);
      return false;
    }
    return true;
  };

  // Media handling
  const saveMediaToLibrary = async () => {
    if (!mediaUri || !selectedEvent) return;

    try {
      // Primeiro salva a mídia na galeria
      await MediaLibrary.createAssetAsync(mediaUri);
      
      // Depois envia para o evento selecionado
      const formData = new FormData();
      const fileUri = Platform.OS === 'android' ? `file://${mediaUri}` : mediaUri;

      formData.append('file', {
        uri: fileUri,
        type: mode === 'photo' ? 'image/jpeg' : 'video/mp4',
        name: `media_${Date.now()}.${mode === 'photo' ? 'jpg' : 'mp4'}`
      } as  any);

      console.log(`/events/${selectedEvent.eventId}/media`)
      console.log(formData)
      const response = await api.post(`/events/${selectedEvent.eventId}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Mídia postada com sucesso:', response.data);
      Alert.alert('Sucesso', 'Mídia salva e postada no evento com sucesso!');
      
      closeMediaModal();
    } catch (error) {
      console.error(`Error saving ${mode === "photo" ? "photo" : "video"}:`, JSON.stringify(error));
      Alert.alert('Erro', 'Ocorreu um erro ao postar a mídia no evento.');
    }
  };

  const renderEventSelectionModal = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showEventSelection}
      onRequestClose={() => setShowEventSelection(false)}
    >
      <View style={styles.eventSelectionContainer}>
        <Text style={styles.eventSelectionTitle}>Selecione o Evento</Text>
        
        {isLoadingEvents ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item, index) => item.eventId ?? index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.eventItem}
                onPress={() => handleEventSelection(item)}
              >
                <Text style={styles.eventName}>{item.title}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noEventsText}>Nenhum evento disponível</Text>
            }
          />
        )}
        
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => {
            setShowEventSelection(false);
            setMediaUri(null);
          }}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const closeMediaModal = () => {
    setMediaUri(null);
    setIsMediaModalVisible(false);
  };

  // UI handlers
  const toggleCameraPosition = () => {
    setCameraPosition(prev => prev === "back" ? "front" : "back");
  };

  const toggleFlash = () => {
    setIsFlashOn(prev => !prev);
  };

  const handleModeChange = (selectedMode: CameraMode) => {
    setMode(selectedMode);
  };

  const fetchEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const response = await api.get('/event/my_events');
      setEvents(response.data);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const handleApiError = (error: any) => {
    if (error.response) {
      console.error('Erro de resposta:', error.response.status);
      if(error.response.status === 401) {
        router.push('/(auth)/signin');
      }
      Alert.alert(
        'Erro',
        error.response.data.message || 'Erro ao processar a requisição.',
        [{ text: 'OK' }]
      );
    } else if (error.request) {
      console.error('Erro de rede:', error.request);
      Alert.alert(
        'Erro de Rede',
        'Verifique sua conexão com a internet.',
        [{ text: 'OK' }]
      );
    } else {
      console.error('Erro de requisição:', error.message);
      Alert.alert(
        'Erro',
        'Erro ao processar a requisição.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleEventSelection = (event: EventData) => {
    setSelectedEvent(event);
    setShowEventSelection(false);
    setIsMediaModalVisible(true); // Agora mostra a prévia da mídia
  };

  // Render helpers
  const renderMediaPreview = () => {
    if (!mediaUri) return null;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isMediaModalVisible}
        onRequestClose={closeMediaModal}
      >
        <View style={styles.mediaContainer}>
          {mode === "photo" ? (
            <Image
              source={{ uri: `${Platform.OS === 'android' ? `file://${mediaUri}` : mediaUri}` }}
              resizeMode="cover"
              style={{ width: SCREEN_DIMENSIONS.width, height: SCREEN_DIMENSIONS.height }}
            />
          ) : (
            <Video
              source={{ uri: mediaUri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              shouldPlay
              isLooping
              resizeMode={ResizeMode.COVER}
              style={{ width: SCREEN_DIMENSIONS.width, height: SCREEN_DIMENSIONS.height }}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={closeMediaModal}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={saveMediaToLibrary}>
            <Text style={styles.modalButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const renderCameraIcon = () => {
    return cameraPosition === 'back' 
      ? <RotateCameraLeft color="white" height={32} width={32} /> 
      : <RotateCameraRight color="white" height={32} width={32} />;
  };

  const renderFlashIcon = () => {
    return isFlashOn 
      ? <FlashOff color="white" height={32} width={32} /> 
      : <Flash color="white" height={32} width={32} />;
  };

  const renderCaptureButtonLabel = () => {
    if (mode === "photo") return "Tirar Foto";
    return isRecording ? "Parar Gravação" : "Iniciar Gravação";
  };

  // Early returns
  if (permission === null) return <View />;
  if (!device) return <Text>Carregando câmera...</Text>;

  return (
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
          onPress={() => handleModeChange("photo")}
        >
          <Text style={styles.modeText}>Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === "video" && styles.activeMode]}
          onPress={() => handleModeChange("video")}
        >
          <Text style={styles.modeText}>Vídeo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.toggleCameraType} onPress={toggleCameraPosition}>
        {renderCameraIcon()}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.toggleFlash} onPress={toggleFlash}>
        {renderFlashIcon()}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonOutCamera} onPress={() => router.back()}>
        <ArrowEmailForward color="white" height={32} width={32} />
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={captureMedia}
        style={styles.captureButton}
      >
        <Text>{renderCaptureButtonLabel()}</Text>
      </TouchableOpacity>
      
      {renderEventSelectionModal()}
      {renderMediaPreview()}
    </View>
  );
}