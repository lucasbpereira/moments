import { Text, View, Image, TouchableOpacity, FlatList, TextInput, Button, Alert, Pressable, Switch, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
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
  const phoneShareRef = useRef<Switch>(null);
  
  // const [secureText, setSecureText] = useState(true);

  function handleNextStep(data: AccountProps) {
    updateFormData(data)
    router.push('/signup/stepThree');
  };

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Image style={styles.logo} source={require("@/assets/logo.png")} />             
              <View style={styles.content}>  
                <Text style={styles.titleText}>Informações Pessoais</Text>
                  <DatePicker
                      ref={birthRef}
                      error={errors.birthDate?.message}
                      formProps={{
                          name: "birthDate",
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
                        name: "gender",
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
                    error={errors.phone?.message}
                    formProps={{
                      name: "phone", 
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
                    ref={phoneShareRef}
                    formProps={{ 
                      control,
                      name: 'phoneShare' }}
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
        </ScrollView>
      </SafeAreaView>
    )    
}

export default StepTwo;
