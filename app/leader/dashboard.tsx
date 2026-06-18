import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function LeaderDashboard() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#F5F0E8]">
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-[#D6CFC4]">
        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={signOut}
        >
          <Text className="text-lg text-[#3B5E2B]">Bumalik</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-2xl font-bold text-[#2C3A1E] text-center">
          Leader Dashboard
        </Text>
        <Text className="text-sm text-[#6B7A5E] text-center">
          placeholder pa la.
        </Text>

        <TouchableOpacity
          className="mt-6 border border-red-200 bg-red-50 rounded-xl px-6 py-3"
          onPress={signOut}
        >
          <Text className="text-red-600 text-sm font-bold tracking-widest">
            MAG-SIGN OUT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
