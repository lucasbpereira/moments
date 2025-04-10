import { StyleSheet } from "react-native";
import {colors} from '@/constants/Colors';

export const styles = StyleSheet.create({
    timeline: {
        marginVertical: 10
    },
    profile_image: {
        width: 48,
        height: 48,
        marginRight: 10
    },
    containerHeader:{
        marginHorizontal:10,
        flexDirection:'row',
        alignItems: 'center',
        marginBottom: 5
    },
    normalSizeContainer: {
        // width: '100%',
        marginHorizontal: 'auto',
        aspectRatio: 1,
        marginBottom:10,
        position: 'relative'
    },
    fullSizeContainer: {
        
    },
    photo: {
        flex:1 ,
        borderRadius: 22,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 4 }, // Distância da sombra
        shadowOpacity: 0.1, // Transparência da sombra
        shadowRadius: 4, // Raio de difusão da sombra
        elevation: 5, // Para Android
    },
    photoFooter: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '95%'
    },


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      imageContainer: {
        position: 'relative',
        width: '100%',
    },
    loadingIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    errorContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
})