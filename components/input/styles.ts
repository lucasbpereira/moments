import { StyleSheet } from "react-native";
import themes from '@/constants/Colors';

export const styles = StyleSheet.create({
    group: {
        flexDirection: 'column',
        marginBottom: 10,
        width: 300
    },
    groupBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: themes.light.tabIconDefault,
        borderRadius: 5,

    },
    passwordControl: {
        width: 260,
        
    },
    control: {
       
        padding: 10,
        fontSize: 16,
        height:50,
        width:"100%"
    },
    textError: {
        color: themes.light.error
    }
})