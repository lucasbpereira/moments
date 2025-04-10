import { Text, View, Image, TouchableOpacity, Modal, Alert, Pressable, ActivityIndicator } from 'react-native';
import {styles} from './styles';
import { useState } from 'react';
import { Heart, HeartSolid, MessageText,  } from 'iconoir-react-native';
// import Video from 'react-native-video'; // Adicione esta importação

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



export function Timeline(props: PhotoComponent) {
  const [modalVisible, setModalVisible] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
      <View style={styles.timeline}>
          <View style={styles.containerHeader}>
              <Text>{props.ownerName}</Text>
          </View>
          
          <View style={styles.normalSizeContainer}>
              {props.mediaType === 'image' ? (
                <Image 
                  style={styles.photo} 
                  source={{ uri: props.fileUrl }}
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  onError={() => {
                      console.log("Erro ao carregar imagem");
                      setImageError(true);
                      setImageLoading(false);
                  }}
                  resizeMode="cover"
                />
                
                
              ) : (
                  // <Video
                  //     source={{ uri: props.fileUrl }}
                  //     style={styles.video}
                  //     paused={true}
                  //     resizeMode="cover"
                  //     controls={false}
                  // />
                  <Text>Ainda não disponível</Text>
              )}
              {imageLoading && (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
              <View style={styles.photoFooter}>
                  <TouchableOpacity onPress={() => setLikedPost(!likedPost)}>
                      {likedPost ? <HeartSolid color="white" height={32} width={32} /> : <Heart color="white" height={32} width={32} />}                      
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <MessageText color="white" height={32} width={32} />                      
                  </TouchableOpacity>
              </View>
          </View>

          {/* Modal permanece o mesmo */}
      </View>
  )
}
