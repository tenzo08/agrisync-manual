import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, UserRole } from "../../context/AuthContext";

const ROLE_LABELS: Record<string, string> = {
  farmer: "FARMER REGISTRATION",
  assistant: "ASSISTANT REGISTRATION",
  coop_leader: "LEADER REGISTRATION",
  buyer: "BUYER REGISTRATION",
};

const ROLE_TITLES: Record<string, string> = {
  farmer: "REHISTRO NG MAGSASAKA",
  assistant: "REHISTRO NG KATUWANG",
  coop_leader: "REHISTRO NG PUNUNO",
  buyer: "REHISTRO NG BUMIBILI",
};

export default function Register() {
  const { role } = useLocalSearchParams<{ role: string }>();
  const { signUp, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roleLabel = ROLE_LABELS[role] ?? "REGISTRATION";
  const roleTitle = ROLE_TITLES[role] ?? "REHISTRO";

  async function handleContinue() {
    if (!name.trim() || !phone.trim() || !password.trim()) return;
    await signUp(name.trim(), phone.trim(), password.trim(), role as UserRole);
  }

  const canSubmit =
    name.trim().length > 1 &&
    phone.trim().length >= 10 &&
    password.length >= 4 &&
    !isLoading;

  return (
    <SafeAreaView className="flex-1 bg-[#F5F0E8]">
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-[#D6CFC4]">
        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => router.back()}
        >
          <Text className="text-lg text-[#3B5E2B]">Bumalik</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mt-8 mb-8 self-center items-center">
            <Text
              className="text-3xl text-[#2C3A1E] leading-tight mb-2"
              style={{ fontWeight: "700" }}
            >
              {roleTitle}
            </Text>
            <Text className="text-sm text-[#6B7A5E]">
              I-set up ang iyong lihim na password.
            </Text>
          </View>

          <View
            className="bg-white rounded-2xl px-5 py-6 mb-6"
            style={{
              elevation: 2,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 8,
            }}
          >
            <View className="mb-5">
              <Text className="text-xs font-bold tracking-widest text-[#6B7A5E] mb-2">
                BUONG PANGALAN
              </Text>
              <TextInput
                className="border border-[#D6CFC4] rounded-xl px-4 py-3 text-sm text-[#2C3A1E] bg-white"
                placeholder="e.g. Carlo Reyes"
                placeholderTextColor="#C4BDB3"
                value={name}
                onChangeText={(v) => {
                  clearError();
                  setName(v);
                }}
                autoCapitalize="words"
              />
            </View>

            <View className="mb-5">
              <Text className="text-xs font-bold tracking-widest text-[#6B7A5E] mb-2">
                NUMERO NG TELEPONO
              </Text>
              <View className="flex-row items-center border border-[#D6CFC4] rounded-xl px-1 py-1 bg-white gap-1">
                <Text className="text-sm text-[#9A9A8A]"></Text>
                <TextInput
                  className="flex-1 text-sm text-[#2C3A1E]"
                  placeholder="e.g. +639171234567"
                  placeholderTextColor="#C4BDB3"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={(v) => {
                    clearError();
                    setPhone(v);
                  }}
                />
              </View>
            </View>

            <View className="mb-5">
              <Text className="text-xs font-bold tracking-widest text-[#6B7A5E] mb-2">
                E-MAIL ADDRESS
              </Text>
              <View className="flex-row items-center border border-[#D6CFC4] rounded-xl px-1 py-1 bg-white gap-1">
                <Text className="text-sm text-[#9A9A8A]"></Text>
                <TextInput
                  className="flex-1 text-sm text-[#2C3A1E]"
                  placeholder="e.g. carlo.reyes@gmail.com"
                  placeholderTextColor="#C4BDB3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(v) => {
                    clearError();
                    setEmail(v);
                  }}
                />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold tracking-widest text-[#6B7A5E] mb-2">
                PASSWORD
              </Text>
              <View className="flex-row items-center border border-[#D6CFC4] rounded-xl px-1 py-1 bg-white gap-2">
                <Text className="text-sm text-[#9A9A8A]"></Text>
                <TextInput
                  className="flex-1 text-sm text-[#2C3A1E]"
                  placeholder="••••••••"
                  placeholderTextColor="#C4BDB3"
                  secureTextEntry
                  value={password}
                  onChangeText={(v) => {
                    clearError();
                    setPassword(v);
                  }}
                />
              </View>
            </View>
          </View>

          {error && (
            <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              <Text className="text-red-600 text-sm text-center">{error}</Text>
            </View>
          )}

          <TouchableOpacity
            className={`rounded-xl py-4 flex-row items-center justify-center gap-2 mb-10 ${
              canSubmit ? "bg-[#3B5E2B]" : "bg-[#3B5E2B]/40"
            }`}
            onPress={handleContinue}
            disabled={!canSubmit}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#A8D96C" />
            ) : (
              <>
                <Text className="text-[#A8D96C] font-bold text-sm tracking-widest">
                  MAGPATULOY
                </Text>
                <Text className="text-[#A8D96C] font-bold">→</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
