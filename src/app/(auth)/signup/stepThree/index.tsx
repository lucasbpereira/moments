import { Text, View, Image, TouchableOpacity, TextInput, Pressable, Alert, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles';
import { globalStyles } from '@/src/styles';
import React, { useRef, useState } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'iconoir-react-native';
import { router } from 'expo-router';
import Input from '@/components/input';
import { useForm, Controller } from 'react-hook-form';
import { useAccountForm } from '@/src/hooks/useAccountForm';
import { AccountProps } from '@/src/context/AccountFormContext';
import axios, { AxiosError } from 'axios';
import { API_URL } from '@/constants/environments';
import api from '@/src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StepThree = () => {
  const { updateFormData } = useAccountForm();
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<AccountProps>();
  const [isLoading, setIsLoading] = useState(false);

  const cepRef = useRef<TextInput>(null);
  const houseNumberRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const districtRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);
  const { accountFormData } = useAccountForm();

  const handleCepChange = async (cep: string) => {
    if (cep.length === 8) {
      setIsLoading(true);
      console.log(cep.length)
      axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
        .then(response => {
          console.log(response.data);
          const { street, neighborhood, city, state } = response.data;
          setValue('zip', cep);
          setValue('address', street);
          setValue('district', neighborhood);
          setValue('city', city);
          setValue('state', state);
          setValue('country', 'Brasil'); // Definindo o país como Brasil
          updateFormData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Erro detalhado:', JSON.stringify(error));
          if (error.response) {
            console.error('Resposta do servidor:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
          } else if (error.request) {
            console.error('Requisição feita, mas sem resposta:', error.request);
          } else {
            console.error('Erro ao configurar a requisição:', error.message);
          }
        })
    }
  };

  const handleSignUp = (data: AccountProps) => {
    updateFormData(data);
    console.log(`${API_URL}/auth/register`)
    console.log(JSON.stringify(accountFormData))
    api.post(`/auth/register`, accountFormData)
    .then(async response => {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
  
      // Redireciona para a rota do painel
      router.replace('/dashboard');  
    })
    .catch(function (error) {
      if (error.response) {
        // O servidor respondeu com um código de status fora do intervalo 2xx
        console.error('Erro de registro:', error.response.data);
        // Exibe a mensagem de erro usando Alert.alert
        Alert.alert(
          'Erro',
          error.response.data.message,
          [{ text: 'OK' }] // Adicione um botão "OK" para fechar o alerta
        );
        return error.response.data; // Retorna os dados do erro, se necessário.
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.error('Erro de rede:', error.request);
        // Exibe um alerta de erro de rede
        Alert.alert('Erro de Rede', 'Verifique sua conexão.', [{ text: 'OK' }]);
        return { message: 'Erro de rede. Verifique sua conexão.' };
      } else {
        // Algum erro aconteceu ao configurar a requisição
        console.error('Erro de requisição:', error.message);
        // Exibe um alerta de erro geral
        Alert.alert('Erro', 'Erro ao processar a requisição.', [{ text: 'OK' }]);
        return { message: 'Erro ao processar a requisição.' };
      }
      
      
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Image style={styles.logo} source={require("@/assets/logo.png")} />
          <View style={styles.content}>
            <Text style={styles.titleText}>Endereço</Text>
            <Input
              ref={cepRef}
              error={errors.zip?.message}
              formProps={{
                name: "zip",
                control,
                rules: {
                  required: "CEP é obrigatório",
                  pattern: {
                    value: /^\d{8}$/,
                    message: "CEP inválido"
                  }
                }
              }}
              inputProps={{
                placeholder: 'CEP',
                onSubmitEditing: () => houseNumberRef.current?.focus(),
                onChangeText: handleCepChange,
                editable: true,
                keyboardType: 'numeric',
                maxLength: 8
              }}
            />
            <Input
              ref={houseNumberRef}
              error={errors.houseNumber?.message}
              formProps={{
                name: "houseNumber",
                control,
                rules: {
                  required: "Número é obrigatório"
                }
              }}
              inputProps={{
                placeholder: 'Número',
                editable: !isLoading,
                onSubmitEditing: () => addressRef.current?.focus()
              }}
            />
            <Input
              ref={addressRef}
              error={errors.address?.message}
              formProps={{
                name: "address",
                control
              }}
              inputProps={{
                placeholder: 'Logradouro',
                editable: !isLoading,
                onSubmitEditing: () => districtRef.current?.focus()
              }}
            />
            <Input
              ref={districtRef}
              error={errors.district?.message}
              formProps={{
                name: "district",
                control
              }}
              inputProps={{
                placeholder: 'Bairro',
                editable: !isLoading,
                onSubmitEditing: () => stateRef.current?.focus()
              }}
            />
            <Input
              ref={cityRef}
              error={errors.city?.message}
              formProps={{
                name: "city",
                control
              }}
              inputProps={{
                placeholder: 'Cidade',
                editable: !isLoading,
                onSubmitEditing: () => countryRef.current?.focus()
              }}
            />
            <Input
              ref={stateRef}
              error={errors.state?.message}
              formProps={{
                name: "state",
                control
              }}
              inputProps={{
                placeholder: 'Estado',
                editable: !isLoading,
                onSubmitEditing: () => countryRef.current?.focus()
              }}
            />
            <Input
              ref={countryRef}
              error={errors.country?.message}
              formProps={{
                name: "country",
                control
              }}
              inputProps={{
                placeholder: 'País',
                editable: !isLoading,
                onSubmitEditing: () => handleSubmit(handleSignUp)(),
                returnKeyType: "next"
              }}
            />
            <View style={[globalStyles.row, styles.formFooter]}>
              <Pressable onPress={() => router.back()} style={globalStyles.row}>
                <ArrowLeftCircle color="black" height={32} width={32} />
                <Text>Voltar</Text>
              </Pressable>
              <TouchableOpacity onPress={handleSubmit(handleSignUp)} style={globalStyles.row}>
                <Text>Finalizar</Text>
                <ArrowRightCircle color="black" height={32} width={32} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StepThree;