import { Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "./global.css";

function RootNavigator() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F5F0E8]">
        <ActivityIndicator size="large" color="#3B5E2B" />
      </View>
    );
  }

  // Slot renders whatever the current route is
  // index.tsx decides where to go based on user state
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
