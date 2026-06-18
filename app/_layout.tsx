import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import "./global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/signin" options={{ animation: "none" }} />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
}
