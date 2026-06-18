import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

type InputMethod = "TELEPONO" | "EMAIL";

const MOCK_QUICK_LOGINS = [
  {
    label: "Maria (Pununo)",
    sublabel: "Terminal ng Pununo",
    phone: "09181234567",
    pin: "5678",
  },
  {
    label: "Juan (Magsasaka)",
    sublabel: "Magsasaka",
    phone: "09171234567",
    pin: "1234",
  },
  {
    label: "Pedro (Bumibili)",
    sublabel: "Bumibili",
    phone: "09191234567",
    pin: "9012",
  },
];

export default function SignIn() {
  const { signIn, isLoading, error, clearError } = useAuth();

  const [inputMethod, setInputMethod] = useState<InputMethod>("TELEPONO");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  function handlePhoneChange(val: string) {
    clearError();
    setPhone(val);
  }

  function handlePasswordChange(val: string) {
    clearError();
    setPassword(val);
  }

  async function handleSignIn() {
    if (!phone.trim() || !password.trim()) return;
    await signIn(phone.trim(), password.trim());
  }

  async function handleQuickLogin(item: (typeof MOCK_QUICK_LOGINS)[0]) {
    if (isLoading) return; // ← add this guard
    await signIn(item.phone, item.pin);
  }

  const canSubmit =
    phone.trim().length >= 10 && password.length >= 4 && !isLoading;

  return (
    <SafeAreaView className="flex-1 bg-[#F5F0E8] mt-20">
      <StatusBar barStyle="dark-content" backgroundColor="#F5F0E8" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="items-center pt-12 pb-6 px-6">
            <View className="w-20 h-20 rounded-full bg-[#3B5E2B] items-center justify-center mb-4"></View>
            <Text
              className="text-5xl text-[#2C3A1E] mb-2"
              style={{ fontWeight: "700", letterSpacing: 0.5 }}
            >
              AgriSync
            </Text>

            <Text className="text-xl text-[#2C3A1E] font-semibold mb-1">
              Gate ng Pagpasok
            </Text>
            <Text className="text-sm text-[#6B7A5E] text-center italic leading-relaxed px-4">
              Ang iyong detalye ay gagabay sa antas ng iyong workspace.
            </Text>
          </View>

          <View
            className="mx-4 bg-white rounded-3xl px-5 py-6"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <View className="flex-row border border-[#D6CFC4] rounded-xl overflow-hidden mb-6">
              {(["TELEPONO", "EMAIL"] as InputMethod[]).map((method) => (
                <TouchableOpacity
                  key={method}
                  className={`flex-1 flex-row items-center justify-center gap-2 py-3 ${
                    inputMethod === method ? "bg-[#F5F0E8]" : "bg-white"
                  }`}
                  onPress={() => {
                    setInputMethod(method);
                    clearError();
                  }}
                >
                  <Text className="text-sm"></Text>
                  <Text
                    className={`text-xs font-bold tracking-widest ${
                      inputMethod === method
                        ? "text-[#2C3A1E]"
                        : "text-[#9A9A8A]"
                    }`}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mb-4">
              <Text className="text-xs font-bold tracking-widest text-[#6B7A5E] mb-2">
                {inputMethod === "TELEPONO"
                  ? "NAKAKONEKTANG TELEPONO"
                  : "EMAIL ADDRESS"}
              </Text>
              <View className="flex-row items-center border border-[#D6CFC4] rounded-xl px-1 py-1 bg-white gap-1">
                <Text className="text-base text-[#9A9A8A]"></Text>
                <TextInput
                  className="flex-1 text-sm text-[#2C3A1E]"
                  placeholder={
                    inputMethod === "TELEPONO"
                      ? "+63 9XX XXX XXXX"
                      : "email@example.com"
                  }
                  placeholderTextColor="#C4BDB3"
                  keyboardType={
                    inputMethod === "TELEPONO" ? "phone-pad" : "email-address"
                  }
                  autoCapitalize="none"
                  value={phone}
                  onChangeText={handlePhoneChange}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>
            </View>

            <View className="mb-2">
              <Text className="text-xs font-bold tracking-widest text-[#6B7A5E] mb-2">
                PASSWORD
              </Text>
              <View className="flex-row items-center border border-[#D6CFC4] rounded-xl px-1 py-1 bg-white gap-1">
                <Text className="text-base text-[#9A9A8A]"></Text>
                <TextInput
                  ref={passwordRef}
                  className="flex-1 text-sm text-[#2C3A1E]"
                  placeholder="••••••••"
                  placeholderTextColor="#C4BDB3"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={handlePasswordChange}
                  returnKeyType="done"
                  onSubmitEditing={handleSignIn}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text className="text-base text-[#9A9A8A] px-5">
                    {showPassword ? "🙈" : "👁️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="items-end mb-5">
              <Text className="text-xs font-bold text-[#7DC537] tracking-widest self-center underline">
                KAILANGAN NG TULONG?
              </Text>
            </TouchableOpacity>

            {error && (
              <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                <Text className="text-red-600 text-sm text-center">
                  {error}
                </Text>
              </View>
            )}

            <TouchableOpacity
              className={`rounded-xl py-4 items-center flex-row justify-center gap-2 mb-4 ${
                canSubmit ? "bg-[#3B5E2B]" : "bg-[#3B5E2B]/40"
              }`}
              onPress={handleSignIn}
              disabled={!canSubmit}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color="#A8D96C" />
              ) : (
                <>
                  <Text className="text-[#A8D96C] font-bold text-sm tracking-widest">
                    MAG-SIGN IN
                  </Text>
                  <Text className="text-[#A8D96C] font-bold text-base">→</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center py-1"
              onPress={() => router.push("/auth/signup")}
            >
              <Text className="text-xs font-bold tracking-widest text-[#6B7A5E]">
                HINDI PA REHISTRADO? MAG-SIGNUP
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mx-4 mt-4 mb-8 border border-[#E8C96A] bg-[#FFFBEE] rounded-2xl px-4 py-4">
            <Text className="text-xs font-bold tracking-widest text-[#8A6F00] text-center mb-3">
              AWTOMATIKONG PAGPASOK SA SANDBOX NG KOOPERATIBA:
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {MOCK_QUICK_LOGINS.map((item) => (
                  <TouchableOpacity
                    key={item.phone}
                    className="border border-[#D6C88A] bg-white rounded-xl px-3 py-2"
                    onPress={() => handleQuickLogin(item)}
                    disabled={isLoading}
                  >
                    <Text className="text-xs font-semibold text-[#2C3A1E]">
                      {item.label}
                    </Text>
                    <Text className="text-xs text-[#8A6F00]">
                      {item.sublabel}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
