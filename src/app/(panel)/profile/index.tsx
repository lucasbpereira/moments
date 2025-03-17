import { Text, View, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from 'react-native';
import {styles} from './styles';
import {globalStyles} from '@/src/styles';
import themes from '@/constants/Colors';
import React, { useState } from 'react';
import { EyeSolid, EyeClosed } from 'iconoir-react-native';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    
  };

    return (
        <View style={styles.container}>
           <Text>Você está logado</Text>

        </View>
    )    
}

export default Index;
