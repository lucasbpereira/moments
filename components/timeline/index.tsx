import { Text, View, Image, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import {styles} from './styles';
import { useState } from 'react';
import { Heart, HeartSolid, MessageText,  } from 'iconoir-react-native';

export type PhotoComponent = {
    id: string
    url: string
    alt: string
    title: string
    likes: number
    comments: number
    author: Author
}

export type Author = {
    id: string
    username: string
    verified: boolean
    profile_image: string
}

export function Timeline(props: PhotoComponent) {
    let urlPhoto = props.author.profile_image ? {uri: props.author.profile_image} : require('@/assets/user-profile.png')
    const [modalVisible, setModalVisible] = useState(false);
    const [likedPost, setLikedPost] = useState(false);
    return (
        <View style={styles.timeline}>
            <View style={styles.containerHeader}>
                <Image 
                    style={styles.profile_image} 
                    source={require('@/assets/user-profile.png')}
                    resizeMode="cover" />  
                <Text>{props.author.username}</Text>
            </View>
            <View style={styles.normalSizeContainer}>
                <Image 
                    style={styles.photo} 
                    source={{ uri: props.url }}
                    resizeMode="cover" />  
                    <View style={styles.photoFooter}>
                        {/* <Feather name="heart" size={24} color={colors.gray[100]} fill={colors.gray[100]} />
                        <Feather name="message-circle" size={24} color={colors.gray[100]} onPress={() => setModalVisible(true)} /> */}
                      <TouchableOpacity onPress={() => setLikedPost(!likedPost)}>
                        {likedPost ? <HeartSolid color="white" height={32} width={32} /> : <Heart color="white" height={32} width={32} />}                      
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <MessageText color="white" height={32} width={32} />                      
                      </TouchableOpacity>
                    </View>
            </View>



            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
    )
}