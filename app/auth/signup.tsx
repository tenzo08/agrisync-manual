import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ROLES = [
  {
    title: "Katuwang ng Magsasaka",
    terminal: "TERMINAL NG ASSISTANT",
    value: "assistant",
  },
  {
    title: "Pununo ng Kooperatiba",
    terminal: "TERMINAL NG PUNUNO",
    value: "coop_leader",
  },
  {
    title: "Bumibili ng Produkto",
    terminal: "TERMINAL NG BUMIBILI",
    value: "buyer",
  },
];

export default function SignUp() {
  function handleSelect(role: string) {
    router.push({ pathname: "/auth/register", params: { role } });
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F5F0E8]">
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => router.back()}
        >
          <Text className="text-lg text-[#3B5E2B]">Bumalik</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="mt-12 mb-8 self-center items-center px-4">
          <Text
            className="text-4xl text-[#2C3A1E] leading-tight self-center text-center"
            style={{ fontWeight: "700" }}
          >
            Paano ka lalahok sa kooperatiba?
          </Text>
          <Text className="text-sm text-[#6B7A5E] italic leading-relaxed">
            Pumili sa ibaba ng iyong papel o gampanin sa system.
          </Text>
        </View>

        <View className="gap-4 pb-10">
          {ROLES.map((role) => (
            <TouchableOpacity
              key={role.value}
              className="bg-white rounded-2xl p-5"
              style={{
                elevation: 2,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 8,
              }}
              onPress={() => handleSelect(role.value)}
              activeOpacity={0.8}
            >
              <Text className="text-base font-bold text-[#2C3A1E] flex-1 pr-2 self-center pb-3">
                {role.title}
              </Text>

              <Text className="text-xs font-bold tracking-widest text-[#3B5E2B] mb-3 self-center">
                {role.terminal}
              </Text>

              <View className="flex-row gap-3 items-start"></View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
