import { StyleSheet } from "react-native";
import {colors} from '@/constants/Colors';

export const styles = StyleSheet.create({
    navbar: {
        height:48,
        backgroundColor: colors.gray[100],
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    }
})