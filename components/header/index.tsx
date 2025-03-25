import { Text, View, Image } from 'react-native';
import {styles} from './styles';

type HeaderComponent = {
    user?: String
    admin: boolean
}

export function Header(props: HeaderComponent) {
    return (
        <View style={styles.header}>
            {/* <TouchableOpacity>
                <Feather name="settings" size={24} color={colors.gray[950]} />
            </TouchableOpacity> */}
            { 
                !props.user ? 
                    <Image style={styles.logo} source={require("@/assets/logo.png")} /> : 
                    <Text style={styles.title}> {props.user} </Text> 
               
            }
            {/* <TouchableOpacity>
                <Feather name="menu" size={24} color={colors.gray[950]} />
            </TouchableOpacity> */}
        </View>
    )
}