import { StyleSheet } from "react-native";
import themes from '@/constants/Colors';

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themes.light.background
    },
    content: {
      margin: 10,
      width: 300,
      flex: 1, 
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
    }
})

export default styles;