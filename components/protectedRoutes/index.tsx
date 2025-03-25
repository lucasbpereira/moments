// components/ProtectedRoute.tsx
import useAuth from '@/src/hooks/useAuth';
import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("USUÁRIO AUTENTICADO?", isAuthenticated);

  if (isLoading) {
    // Exibe um indicador de carregamento enquanto verifica a autenticação
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/signin" />;
  }

  return <>{children}</>;
}