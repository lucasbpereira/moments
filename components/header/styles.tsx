import { StyleSheet } from "react-native";
import {colors} from '@/constants/Colors';

export const styles = StyleSheet.create({
    title: {
        color: colors.gray[900],
        fontSize: 18,
        fontWeight: 600
    },
    header: {
        paddingHorizontal: 24,
        height:48,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: colors.gray[100],
        width: "100%"
    },
    logo: {
        width: 32,
        height: 32,
        marginTop:10
    }
})