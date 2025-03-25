import { StyleSheet } from "react-native";
import themes from '@/constants/Colors';

export const styles = StyleSheet.create({
    group: {
        flexDirection: 'row',
        marginBottom: 10,
        width: 300
    },
    control: {
        borderWidth: 1,
        borderColor: themes.light.tabIconDefault,
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        height:50,
        width:"100%"
    },
    textError: {
        color: themes.light.error
    }
})