import ProtectedRoute from '@/components/protectedRoutes';
import { Stack } from 'expo-router';

export default function PanelLayout() {
  return (
    <ProtectedRoute>
      <Stack screenOptions={{ headerShown: false }} />
    </ProtectedRoute>
  );
}