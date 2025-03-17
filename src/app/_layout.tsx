import { Stack } from "expo-router";
import themes from '@/constants/Colors';
import { AccountProvider } from "../context/AccountFormContext";

export default function MainLayout() {
  const backgroundColor = themes.light.background

  return(
    <AccountProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor }
      }}>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} />
        <Stack.Screen 
          name="(auth)/signup" 
          options={{ headerShown: false }} />
        <Stack.Screen 
          name="(auth)/signup/stepTwo" 
          options={{ headerShown: false }} />
        <Stack.Screen 
          name="(panel)/profile" 
          options={{ headerShown: false }} />
      </Stack>
    </AccountProvider>
  )
}