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
import Select from '@/components/select';
import { Picker } from '@react-native-picker/picker';
import DatePicker from '@/components/datePicker';
import { useAccountForm } from '@/src/hooks/useAccountForm';
import { AccountProps } from '@/src/context/AccountFormContext';
import Toggle from '@/components/toggle';

const StepTwo = () => {
  const { updateFormData } = useAccountForm();
  const { control, handleSubmit, formState: {errors} } = useForm<AccountProps>();
  
  const genderItems = [
    { label: 'Homem', value: 'H' },
    { label: 'Mulher', value: 'M' }
  ];

  const birthRef = useRef<any>(null);
  const genderRef = useRef<Picker<string>>(null);
  const phoneNumberRef = useRef<TextInput>(null);
  
  // const [secureText, setSecureText] = useState(true);

  function handleNextStep(data: AccountProps) {
    updateFormData(data)
    router.push('/(auth)/signup/stepThree');
  };

    return (
        <View style={styles.container}>
          <Image style={styles.logo} source={require("@/assets/logo.png")} />             
            <View style={styles.content}>  
              <Text style={styles.titleText}>Informações Pessoais</Text>
                {/* <Input
                  ref={birthRef}
                  error={errors.birth?.message}
                  formProps={{
                    name: "birth", 
                    control,
                    rules: {
                      required: "Data de Nascimento é obrigatório",
                      pattern: {
                        value: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                      message: "Data de Nascimento inválida"
                      }

                    }
                  }} 
                  inputProps={{
                    placeholder: 'Data de Nascimento',
                    onSubmitEditing: () => genderRef.current?.focus()
                  }}
                /> */}
                <DatePicker
                    ref={birthRef}
                    error={errors.birth?.message}
                    formProps={{
                        name: "birth",
                        control,
                        rules: {
                            required: "Data de Nascimento é obrigatória",
                        },
                    }}
                    placeholder="Selecione sua Data de Nascimento"
                />
                <Select
                  ref={genderRef}
                  error={errors.gender?.message}
                  formProps={{
                      name: "gen",
                      control,
                      rules: {
                          required: "Gênero é obrigatório",
                      },
                  }}
                  items={genderItems}
                  placeholder="Selecione o gênero"
                />
                <Input
                  ref={phoneNumberRef}
                  error={errors.phoneNumber?.message}
                  formProps={{
                    name: "phoneNumber", 
                    control,
                    rules: {
                      required: "Número de celular é obrigatório",
                      
                    } 
                  }} 
                  inputProps={{
                    placeholder: 'Número de Celular',
                    onSubmitEditing: () =>  handleSubmit(handleNextStep)(),
                    returnKeyType: "next"
                  }}
                />
                <Toggle
                  formProps={{ 
                    control,
                    name: 'sharedPhone' }}
                  label="Desejo compartilhar meu número com todos os usuários"
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
                                    <Text>Próximo</Text>
                    <ArrowRightCircle color="black" height={32} width={32}  />
                  </TouchableOpacity>
                </View>

            </View>
            

        </View>
    )    
}

export default StepTwo;
