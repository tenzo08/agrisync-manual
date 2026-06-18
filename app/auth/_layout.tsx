import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" options={{ animation: "none" }} />
      <Stack.Screen name="index" options={{ animation: "slide_from_left" }} />
      <Stack.Screen name="signup" options={{ animation: "slide_from_right" }} />
      <Stack.Screen
        name="register"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
