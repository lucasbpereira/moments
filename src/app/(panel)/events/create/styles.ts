import { StyleSheet } from "react-native";
import themes from '@/constants/Colors';

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      width: '100%',

      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themes.light.background
    },
    content: {
      flex: 1, 

      width: 300
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom:25
    },
    titleText: {
      fontSize: 28,
      fontWeight: 700,
      marginBottom: 25
    },
    formFooter: {
      justifyContent: 'space-between'
    }
})

export default styles;