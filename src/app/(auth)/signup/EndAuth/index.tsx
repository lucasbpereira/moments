import { useAccountForm } from "@/src/hooks/useAccountForm";
import { SafeAreaView, ScrollView, Text, View } from "react-native";


const EndAuth = () => {
    const { accountFormData } = useAccountForm();

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <View>
                    <Text>
                        Parabéns {accountFormData.firstName}!
                    </Text>
                    <Text>Em breve você vai conseguir compartilhar seus melhores momentos com seus amigos!</Text>
                    <Text>Verifique seu e-mail! Enviamos um e-mail de confirmação para sua caixa de entrada!</Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
    
}

export default EndAuth;
