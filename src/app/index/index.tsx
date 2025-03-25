// import { Text, View, Image, TouchableOpacity, FlatList, TextInput, Button, Alert, Pressable } from 'react-native';
// import {styles} from './styles';
// import {globalStyles} from '@/src/styles';
// import themes from '@/constants/Colors';
// import React, { useState } from 'react';
// import { EyeSolid, EyeClosed } from 'iconoir-react-native';
// import { Link } from 'expo-router';

// const Index = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [secureText, setSecureText] = useState(true);

//   const handleLogin = async () => {
    
//   };

//     return (
//         <View style={styles.container}>
//             {/* <Header  admin={false}  /> */}
//               <Image style={styles.logo} source={require("@/assets/logo.png")} />             
//               <View style={styles.content}>  
//                 <Text style={styles.titleText}>Login</Text>
//                 <TextInput
//                   style={globalStyles.input}
//                   placeholder="E-mail"
//                   value={email}
//                   onChangeText={setEmail}
                  
//                 />
//                 <View style={globalStyles.passwordContainer}>
//                   <TextInput
//                     style={globalStyles.password}
//                     placeholder="Digite sua senha"
//                     secureTextEntry={secureText}
//                     value={password}
//                     onChangeText={setPassword}
//                   />
//                   <TouchableOpacity onPress={() => setSecureText(!secureText)}>
//                     <View>{secureText ? <EyeSolid color={themes.light.tabIconDefault} height={32} width={32}/> : <EyeClosed color={themes.light.tabIconDefault} height={32} width={32}/>}</View>
//                   </TouchableOpacity>
//                 </View>
//                 <Pressable style={globalStyles.button}>
//                   <Text style={globalStyles.textButton}>Entrar</Text>
//                 </Pressable>
//                 <Link href='/(auth)/signup'>
//                   Ainda não possuo conta
//                 </Link>
//               </View>
//               {/* <Navbar></Navbar> */}

//         </View>
//     )    
// }

// export default Index;
// app/index.tsx
import useAuth from '@/src/hooks/useAuth';
import { Redirect } from 'expo-router';

export default function Index() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/signin" />;
  }

  return <Redirect href="/(panel)/dashboard" />;
}