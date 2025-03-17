import { Text, View, Image, TouchableOpacity, TextInput, Pressable } from 'react-native';
import {styles} from './styles';
import {globalStyles} from '@/src/styles';
import React, { useRef } from 'react';
import { router, useRouter } from 'expo-router';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { ArrowLeftCircle, ArrowRightCircle } from 'iconoir-react-native';
import { AccountProps } from '@/src/context/AccountFormContext';
import { useAccountForm } from '@/src/hooks/useAccountForm';

const SignUp = () => {
  const { updateFormData } = useAccountForm();
  const { control, handleSubmit, formState: {errors}, getValues } = useForm<AccountProps>();
  const router = useRouter();

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const passwordConfirmationRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data)
    router.push('/(auth)/signup/stepTwo');
  };

  function validationPasswordConfirmation(passwordConfirmation: string) {
    const { password } = getValues();

    return password === passwordConfirmation || "As senhas devem ser iguais."
  };

  return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("@/assets/logo.png")} />             
          <View style={styles.content}>  
            <Text style={styles.titleText}>Cadastro</Text>
              <Input
                ref={firstNameRef}
                error={errors.firstName?.message}
                formProps={{
                  name: "firstName", 
                  control,
                  rules: {
                    required: "Nome é obrigatório"
                  }
                }} 
                inputProps={{
                  placeholder: 'Nome',
                  onSubmitEditing: () => lastNameRef.current?.focus()
                }}
              />
              <Input
                ref={lastNameRef}
                error={errors.lastName?.message}
                formProps={{
                  name: "lastName", 
                  
                  control,
                  rules: {
                    required: "Sobrenome é obrigatório"
                  }
                }} 
                inputProps={{
                  placeholder: 'Sobrenome',
                  onSubmitEditing: () => emailRef.current?.focus()
                }}
              />
              <Input
                ref={emailRef}
                error={errors.email?.message}
                formProps={{
                  name: "email", 
                  control,
                  rules: {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
                      message: "E-mail inválido"
                    }
                  }
                }} 
                inputProps={{
                  placeholder: 'E-mail',
                  onSubmitEditing: () => passwordRef.current?.focus()
                }}
              />
              <Input
                ref={passwordRef}
                error={errors.password?.message}
                passwordInput={true}
                formProps={{
                  name: "password", 
                  control,
                  rules: {
                    required: "Senha é obrigatório",
                    minLength: {
                      value: 8,
                      message: "A senha deve ter pelo menos 8 dígitos."
                    }
                  }
                }} 
                inputProps={{
                  placeholder: 'Senha',
                  onSubmitEditing: () => passwordRef.current?.focus()
                }}
              />
              <Input
                ref={passwordConfirmationRef}
                error={errors.passwordConfirmation?.message}
                passwordInput={true}
                formProps={{
                  name: "passwordConfirmation", 
                  control,
                  rules: {
                    required: "Confirmação de Senha é obrigatório",
                    validate: validationPasswordConfirmation
                  }
                }} 
                inputProps={{
                  placeholder: 'Confirme sua Senha',
                  onSubmitEditing: () => handleSubmit(handleNextStep)(),
                  returnKeyType: "next"
                }}
              />
              <View style={[globalStyles.row, styles.formFooter]}>
                <Pressable onPress={() => router.back()} 
                // style={globalStyles.row}
                >
                  {/* <ArrowLeftCircle color="black" height={32} width={32}  /> */}
                  <Text>Já possuo conta</Text>
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

export default SignUp;
