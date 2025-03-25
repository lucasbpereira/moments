import { Redirect, Slot, Stack } from "expo-router";
import themes from '@/constants/Colors';
import { AccountProvider } from "@/src/context/AccountFormContext";

export default function AuthLayout() {
  const backgroundColor = themes.light.background
  
  return(
    <AccountProvider>
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor }
      }}
    />
  </AccountProvider>
  )
}