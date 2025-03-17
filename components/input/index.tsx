import { View, TextInput, TextInputProps, Text, TouchableOpacity } from 'react-native';
import {styles} from './styles';
import React, { forwardRef, useState } from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';
import { EyeSolid, EyeClosed } from 'iconoir-react-native';
import themes from '@/constants/Colors';

type Props = {
    formProps: UseControllerProps;
    inputProps: TextInputProps;
    error?: string;
    passwordInput?: boolean;
}

const Input = forwardRef<TextInput, Props>(({ formProps, inputProps, error = '', passwordInput = false}, ref) => {
    const [secureText, setSecureText] = useState(passwordInput);
    
    return (
        <Controller 
            render={({ field }) => (
                <View style={styles.group}>
                    <View style={styles.groupBox}>
                        <TextInput 
                        value={field.value}
                        onChangeText={field.onChange}
                        secureTextEntry={secureText}
                        style={
                            passwordInput ? [styles.control, styles.passwordControl] : styles.control
                        } 
                        {...inputProps} />
                        {
                            passwordInput &&
                            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                                <View>{secureText ? <EyeSolid color={themes.light.tabIconDefault} height={32} width={32}/> : <EyeClosed color={themes.light.tabIconDefault} height={32} width={32}/>}</View>
                            </TouchableOpacity>
                        }
                    </View>

                    {
                        error.length > 0 &&
                        <Text style={styles.textError}>
                            {error}
                        </Text>
                    }
                    
                </View>
            )} 
            {...formProps}
            />
    )    
})

export default Input;
