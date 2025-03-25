import { Stack } from "expo-router";
import themes from '@/constants/Colors';
import { AccountProvider } from "../context/AccountFormContext";

export default function MainLayout() {
  const backgroundColor = themes.light.background
  
  return (
    <AccountProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor } }} />
    </AccountProvider>
  )
  // return(
  //   <AccountProvider>
  //     <Stack screenOptions={{
  //       headerShown: false,
  //       contentStyle: { backgroundColor }
  //     }}>
  //       <Stack.Screen 
  //         name="(auth)/signin" 
  //         options={{ headerShown: false }} />
  //       <Stack.Screen 
  //         name="(auth)/signup" 
  //         options={{ headerShown: false }} />
  //       <Stack.Screen 
  //         name="(auth)/signup/stepTwo" 
  //         options={{ headerShown: false }} />
  //       <Stack.Screen 
  //         name="(auth)/signup/stepThree" 
  //         options={{ headerShown: false }} />
  //       <Stack.Screen 
  //         name="(panel)/profile" 
  //         options={{ headerShown: false }} />
  //     </Stack>
  //   </AccountProvider>
  // )
}

// import { Redirect } from 'expo-router';

// export default function MainLayout() {
//   return <Redirect href="/(auth)/signin" />;
// }