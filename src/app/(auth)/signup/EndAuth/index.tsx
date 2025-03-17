import { useAccountForm } from "@/src/hooks/useAccountForm";
import { Text, View } from "react-native";


const EndAuth = () => {
    const { accountFormData } = useAccountForm();

    return (
        <View>
            <Text>
                Parabéns {accountFormData.firstName}!
            </Text>
            <Text>Em breve você vai conseguir compartilhar seus melhores momentos com seus amigos!</Text>
            <Text>Verifique seu e-mail! Enviamos um e-mail de confirmação para sua caixa de entrada!</Text>

        </View>
    )
    
}

export default EndAuth;
