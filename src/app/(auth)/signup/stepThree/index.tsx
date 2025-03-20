import { Text, View, Image, TouchableOpacity, FlatList, TextInput, Button, Alert, Pressable } from 'react-native';
import {styles} from './styles';
import {globalStyles} from '@/src/styles';
import themes from '@/constants/Colors';
import React, { useRef, useState } from 'react';
import { EyeSolid, EyeClosed, ArrowLeftCircle } from 'iconoir-react-native';
import { Link, router } from 'expo-router';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { ArrowRightCircle } from 'iconoir-react-native';
import { useAccountForm } from '@/src/hooks/useAccountForm';
import { AccountProps } from '@/src/context/AccountFormContext';

const StepThree = () => {
  const { updateFormData } = useAccountForm();
  const { control, handleSubmit, formState: {errors} } = useForm<AccountProps>();
  console.log("ERRO: " + errors);

  const cepRef = useRef<TextInput>(null);
  const houseNumberRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const districtRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);
  
  // const [secureText, setSecureText] = useState(true);

  function handleNextStep(data: AccountProps) {
    updateFormData(data)
  };

  function getFullAddress(data: AccountProps) {
    console.log(data.cep)
  };

    return (
        <View style={styles.container}>
          <Image style={styles.logo} source={require("@/assets/logo.png")} />             
            <View style={styles.content}>  
              <Text style={styles.titleText}>Endereço</Text>
                <Input
                  ref={cepRef}
                  error={errors.cep?.message}
                  formProps={{
                    name: "cep", 
                    control,
                    rules: {
                      required: "CEP é obrigatório"
                    }
                  }} 
                  inputProps={{
                    placeholder: 'CEP',
                    onSubmitEditing: () =>  handleSubmit(getFullAddress)(),
                  }}
                />
                <Input
                  ref={houseNumberRef}
                  error={errors.houseNumber?.message}
                  formProps={{
                    name: "houseNumber", 
                    control,
                    rules: {
                      required: "Número"
                    }
                  }} 
                  inputProps={{
                    placeholder: 'Número',
                    onSubmitEditing: () => addressRef.current?.focus()
                  }}
                />
                <Input
                  ref={addressRef}
                  error={errors.address?.message}
                  formProps={{
                    name: "address", 
                    control,
                    rules: {
                      required: "Lobradouro é obrigatório"
                    }
                  }} 
                  inputProps={{
                    placeholder: 'Logradouro',
                    onSubmitEditing: () => districtRef.current?.focus()
                  }}
                />
                <Input
                  ref={districtRef}
                  error={errors.district?.message}
                  formProps={{
                    name: "district", 
                    control,
                    rules: {
                      required: "Bairro é obrigatório"
                    }
                  }} 
                  inputProps={{
                    placeholder: 'Bairro',
                    onSubmitEditing: () => districtRef.current?.focus()
                  }}
                />
                <Input
                  ref={stateRef}
                  error={errors.state?.message}
                  formProps={{
                    name: "state", 
                    control,
                    rules: {
                      required: "Estado é obrigatório"
                    }
                  }} 
                  inputProps={{
                    placeholder: 'Estado',
                    onSubmitEditing: () => districtRef.current?.focus()
                  }}
                />
                <Input
                    ref={countryRef}
                    error={errors.country?.message}
                    formProps={{
                    name: "country", 
                    control,
                    rules: {
                        required: "País é obrigatório"
                    }
                    }} 
                    inputProps={{
                    placeholder: 'País',
                    onSubmitEditing: () =>  handleSubmit(handleNextStep)(),
                    returnKeyType: "next"
                    }}
                />
              <View style={[globalStyles.row, styles.formFooter]}>
                  <Pressable onPress={() => router.back()} 
                                                    style={globalStyles.row}
                                                    >
                                                      <ArrowLeftCircle color="black" height={32} width={32}  />
                                                      <Text>Voltar</Text>
                                                    </Pressable>
                                                    <TouchableOpacity onPress={() => {
                                                      console.log("Botão pressionado");
                                                      handleSubmit(handleNextStep)();
                                                    }} style={globalStyles.row}>
                                                      <Text>Finalizar</Text>
                    <ArrowRightCircle color="black" height={32} width={32}  />
                  </TouchableOpacity>
                </View>

            </View>
            

        </View>
    )    
}

export default StepThree;
