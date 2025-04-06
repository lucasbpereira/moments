

import { StyleSheet } from "react-native";
import themes from '@/constants/Colors';

export const globalStyles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: themes.light.tabIconDefault,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        height:50
    },
    password: {
        padding: 10,
        height:50,
        width:250
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: themes.light.tabIconDefault,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: themes.light.tint,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    textButton: {
        color: themes.dark.tint,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})