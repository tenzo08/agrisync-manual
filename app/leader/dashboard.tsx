import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeaderDashboard() {
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === "web";
  const isWideWeb = isWeb && width >= 768;

  const maxContentWidth = isWideWeb ? 960 : 430;
  const pagePadding = isWideWeb ? 24 : 18;

  const statusCardWidth = isWideWeb ? "48.5%" : "100%";

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 bg-[#F7F8F2]"
      style={isWeb ? ({ minHeight: "100vh" } as any) : undefined}
    >
      <View className="flex-1 bg-[#F7F8F2]">
        {/* FIXED HEADER */}
        <DashboardHeader maxWidth={maxContentWidth} />

        {/* SCROLLABLE BODY ONLY */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: pagePadding,
            paddingTop: 18,
            paddingBottom: 24,
          }}
        >
          <View style={{ width: "100%", maxWidth: maxContentWidth }}>
            {/* TOP SECTION */}
            <View
              style={{
                flexDirection: isWideWeb ? "row" : "column",
                gap: 16,
              }}
            >
              {/* MAIN COOP CARD */}
              <View style={{ flex: 1 }}>
                <View className="bg-white rounded-3xl p-5 border border-[#E1E2D8] shadow-sm mb-6">
                  <View className="self-start border border-[#008F69] rounded-md px-3 py-1 mb-4">
                    <Text className="text-[#006B52] font-bold text-xs tracking-widest">
                      LEADER CONTROL COCKPIT
                    </Text>
                  </View>

                  <Text className="text-[#1E2A22] text-2xl font-semibold leading-7">
                    Carigara Rice Growers{"\n"}Cooperative
                  </Text>

                  <Text className="text-[#66825A] mt-2 text-sm leading-5">
                    Carigara, Leyte Region Shared Hub{"\n"}
                    Manager: <Text className="font-bold">Maria Santos</Text>
                  </Text>
                </View>
              </View>

              {/* MANAGEMENT TOOLS */}
              <View style={{ flex: 1 }}>
                <View className="bg-white rounded-3xl p-5 border border-[#E1E2D8] shadow-sm mb-6">
                  <View className="flex-row items-center gap-4 mb-4">
                    <View className="h-12 w-12 rounded-xl bg-[#E7FFF2] items-center justify-center">
                      <Ionicons
                        name="briefcase-outline"
                        size={22}
                        color="#00996F"
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="text-[#1E2A44] font-semibold text-base leading-5">
                        MGA KASANGKAPAN SA{"\n"}PAMAMAHALA NG KOOPERATIBA
                      </Text>
                      <Text className="text-[#657897] text-sm mt-1">
                        System tools, guided tours, and settings configuration
                      </Text>
                    </View>
                  </View>

                  <View className="h-[1px] bg-[#D8D8CF] mb-4" />

                  <FeatureCard
                    icon={
                      <Feather name="trending-up" size={20} color="#635BFF" />
                    }
                    title="Cooperative Analytics"
                    subtitle="Real-time charts, metrics, and stock reports"
                    bg="#EEF0FF"
                    iconBg="#DFE1FF"
                    border="#2E2C72"
                  />

                  <FeatureCard
                    icon={
                      <Ionicons
                        name="document-text-outline"
                        size={20}
                        color="#0CA678"
                      />
                    }
                    title="I-export ang Executive Report"
                    bg="#EFFFF7"
                    iconBg="#CFF8E6"
                    border="#234D3B"
                  />

                  <FeatureCard
                    icon={
                      <Ionicons
                        name="sparkles-outline"
                        size={20}
                        color="#E58A00"
                      />
                    }
                    title="Gabay sa Pagsasanay"
                    bg="#FFF9E8"
                    iconBg="#FFF0BD"
                    border="#F0D88B"
                  />
                </View>
              </View>
            </View>

            {/* STATUS CARDS */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <View style={{ width: statusCardWidth }}>
                <StatusCard
                  icon={
                    <Ionicons
                      name="heart-dislike-outline"
                      size={22}
                      color="#FF4D4F"
                    />
                  }
                  title="Krisis at Saklolo"
                  value="2 Aktibo"
                  valueColor="#D71920"
                  iconBg="#FFF0F0"
                />
              </View>

              <View style={{ width: statusCardWidth }}>
                <StatusCard
                  icon={
                    <MaterialCommunityIcons
                      name="truck-outline"
                      size={24}
                      color="#00996F"
                    />
                  }
                  title="Makinarya ng Fleet"
                  value="3 Magagamit"
                  valueColor="#007A5A"
                  iconBg="#E7FFF2"
                />
              </View>

              <View style={{ width: statusCardWidth }}>
                <StatusCard
                  icon={
                    <MaterialCommunityIcons
                      name="currency-php"
                      size={24}
                      color="#C06B00"
                    />
                  }
                  title="Pondo sa Pagkukumpuni"
                  value="₱45,310"
                  valueColor="#1E2A22"
                  iconBg="#FFF8E5"
                />
              </View>

              <View style={{ width: statusCardWidth }}>
                <StatusCard
                  icon={
                    <Ionicons name="gift-outline" size={23} color="#00996F" />
                  }
                  title="Pautang sa mga Liso"
                  value="1 Aktibidad"
                  valueColor="#007A5A"
                  iconBg="#E7FFF2"
                />
              </View>
            </View>

            {/* LOWER SECTION */}
            <View
              style={{
                flexDirection: isWideWeb ? "row" : "column",
                gap: 16,
              }}
            >
              {/* INVENTORY SUPPLY CHAIN */}
              <View style={{ flex: 1 }}>
                <View className="bg-white rounded-3xl p-5 border border-[#E1E2D8] shadow-sm mb-6">
                  <View className="flex-row items-start justify-between mb-3">
                    <View>
                      <Text className="text-[#90A0BA] text-xs font-bold tracking-widest">
                        INVENTORY SUPPLY
                      </Text>
                      <Text className="text-[#90A0BA] text-xs font-bold tracking-widest mt-1">
                        CHAIN
                      </Text>
                      <Text className="text-[#1E6B36] text-base font-semibold mt-2">
                        GRASSROOTS STOCK{"\n"}BLOCKS
                      </Text>
                    </View>

                    <View className="bg-[#E0F9EC] border border-[#BDEBD1] rounded-lg px-4 py-2">
                      <Text className="text-[#177245] font-bold text-sm">
                        Total:{"\n"}16,550 Kg
                      </Text>
                    </View>
                  </View>

                  <View className="h-[1px] bg-[#1E2A22] mb-4" />

                  <InventoryItem
                    icon="🌾"
                    title="Wet Palay"
                    subtitle="Raw Inventory"
                    amount="6,050 kg"
                    bg="#FFF5F7"
                  />

                  <InventoryItem
                    icon="🌞"
                    title="Dried Rice"
                    subtitle="Milling Queue"
                    amount="7,100 kg"
                    bg="#FFFDF0"
                  />

                  <InventoryItem
                    icon="🍚"
                    title="Milled Rice"
                    subtitle="Consumer Ready"
                    amount="3,400 kg"
                    bg="#F1FFFA"
                  />
                </View>
              </View>

              {/* QUICK NAVIGATION */}
              <View style={{ flex: 1 }}>
                <View className="bg-white rounded-3xl p-5 border border-[#E1E2D8] shadow-sm mb-6">
                  <Text className="text-[#90A0BA] text-xs font-bold tracking-widest">
                    QUICK NAVIGATION MODULES
                  </Text>
                  <Text className="text-[#1E2A44] text-base font-semibold mt-2">
                    COOPERATIVE OPERATIONAL MODULES
                  </Text>

                  <View className="h-[1px] bg-[#1E2A22] my-4" />

                  <ModuleButton
                    icon={
                      <Ionicons
                        name="layers-outline"
                        size={20}
                        color="#E58100"
                      />
                    }
                    title="Queue Manager"
                    iconBg="#FFF4D9"
                  />

                  <ModuleButton
                    icon={
                      <MaterialCommunityIcons
                        name="database-outline"
                        size={21}
                        color="#D89100"
                      />
                    }
                    title="Log Grain Deposits"
                    iconBg="#FFF8E7"
                  />

                  <ModuleButton
                    icon={
                      <Ionicons
                        name="people-outline"
                        size={21}
                        color="#2458FF"
                      />
                    }
                    title="Farmer Registry"
                    iconBg="#EEF3FF"
                  />

                  <ModuleButton
                    icon={
                      <Ionicons
                        name="bag-handle-outline"
                        size={21}
                        color="#00A878"
                      />
                    }
                    title="Market Listings"
                    iconBg="#EFFFF8"
                  />

                  <ModuleButton
                    icon={
                      <Ionicons
                        name="heart-circle-outline"
                        size={22}
                        color="#E33361"
                      />
                    }
                    title="QR Fulfillment"
                    iconBg="#FFF0F3"
                  />

                  <ModuleButton
                    icon={
                      <MaterialCommunityIcons
                        name="currency-usd"
                        size={21}
                        color="#4B50FF"
                      />
                    }
                    title="Finance & Revenue Summary"
                    iconBg="#F0F1FF"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* FIXED FOOTER */}
        <DashboardFooter maxWidth={maxContentWidth} />
      </View>
    </SafeAreaView>
  );
}

function DashboardHeader({ maxWidth }: { maxWidth: number }) {
  return (
    <View className="bg-[#587342] border-b border-[#465C33]">
      <View className="w-full self-center px-5 py-4" style={{ maxWidth }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <View className="h-10 w-10 rounded-full bg-white items-center justify-center">
              <Ionicons name="layers-outline" size={22} color="#587342" />
            </View>

            <View className="flex-1">
              <Text className="text-white/80 text-xs italic">AgriSync</Text>
              <Text className="text-white font-bold text-sm tracking-wider">
                CARIGARA RICE GROWERS
              </Text>
              <Text className="text-white font-bold text-sm tracking-wider">
                COOPERATIVE
              </Text>
            </View>
          </View>

          <View className="bg-[#D7D0B7] px-3 py-1 rounded-md flex-row items-center gap-1">
            <Ionicons
              name="shield-checkmark-outline"
              size={14}
              color="#39452F"
            />
            <Text className="text-[#39452F] font-bold text-xs">2 SOS</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function DashboardFooter({ maxWidth }: { maxWidth: number }) {
  return (
    <View className="bg-[#FAFBF6] border-t border-[#DADDD0]">
      <View className="w-full self-center px-3 pt-2 pb-2" style={{ maxWidth }}>
        <View className="flex-row justify-between">
          <BottomTab icon="home-outline" label="Dashboard" active />
          <BottomTab icon="heart-outline" label="Saklolo / SOS" badge="2" />
          <BottomTab icon="car-outline" label="Subaybay sa Fleet" />
          <BottomTab icon="menu-outline" label="Iba pang Pahina" />
        </View>
      </View>
    </View>
  );
}

function FeatureCard({
  icon,
  title,
  subtitle,
  bg,
  iconBg,
  border,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  bg: string;
  iconBg: string;
  border: string;
}) {
  return (
    <Pressable
      className="rounded-2xl px-4 py-4 mb-3 flex-row items-center"
      style={{ backgroundColor: bg, borderWidth: 1, borderColor: border }}
    >
      <View
        className="h-11 w-11 rounded-xl items-center justify-center mr-4"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </View>

      <View className="flex-1">
        <Text className="text-[#1E2A44] font-bold text-sm">{title}</Text>
        {subtitle && (
          <Text className="text-[#1E2A44] text-xs mt-1 font-semibold">
            {subtitle}
          </Text>
        )}
      </View>

      <Ionicons name="chevron-forward" size={18} color="#283152" />
    </Pressable>
  );
}

function StatusCard({
  icon,
  title,
  value,
  valueColor,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  valueColor: string;
  iconBg: string;
}) {
  return (
    <View className="bg-white rounded-3xl p-5 border border-[#E1E2D8] shadow-sm mb-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4 flex-1">
          <View
            className="h-12 w-12 rounded-xl items-center justify-center"
            style={{ backgroundColor: iconBg }}
          >
            {icon}
          </View>

          <Text className="text-[#1E2A44] text-base font-semibold flex-1">
            {title}
          </Text>
        </View>

        <View className="border border-[#BDEBD1] rounded-xl px-5 py-3 bg-white min-w-[120px] items-center">
          <Text className="font-bold text-sm" style={{ color: valueColor }}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}

function InventoryItem({
  icon,
  title,
  subtitle,
  amount,
  bg,
}: {
  icon: string;
  title: string;
  subtitle: string;
  amount: string;
  bg: string;
}) {
  return (
    <View
      className="rounded-2xl border border-[#DDE1E5] p-4 mb-3 flex-row items-center"
      style={{ backgroundColor: bg }}
    >
      <View className="h-14 w-14 rounded-xl bg-white/60 items-center justify-center mr-4">
        <Text className="text-2xl">{icon}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-[#2C3028] font-bold text-sm">{title}</Text>
        <Text className="text-[#2C3028] font-semibold text-sm">{subtitle}</Text>
      </View>

      <View className="bg-white border border-[#D8D8CF] rounded-xl px-4 py-3">
        <Text className="text-[#1E2A44] font-bold text-sm">{amount}</Text>
      </View>
    </View>
  );
}

function ModuleButton({
  icon,
  title,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  iconBg: string;
}) {
  return (
    <Pressable className="bg-[#F7FAFD] rounded-2xl border border-[#DDE5EC] px-4 py-4 mb-3 flex-row items-center">
      <View
        className="h-11 w-11 rounded-xl items-center justify-center mr-4"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </View>

      <Text className="flex-1 text-[#1E2A44] font-bold text-sm">{title}</Text>

      <Ionicons name="chevron-forward" size={18} color="#8BA0B8" />
    </Pressable>
  );
}

function BottomTab({
  icon,
  label,
  active,
  badge,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <Pressable className="items-center flex-1 relative">
      <View>
        <Ionicons
          name={icon}
          size={22}
          color={active ? "#587342" : "#6F8461"}
        />

        {badge && (
          <View className="absolute -top-2 -right-3 bg-[#FF4D4F] h-5 w-5 rounded-full items-center justify-center">
            <Text className="text-white text-xs font-bold">{badge}</Text>
          </View>
        )}
      </View>

      <Text
        className={`text-[11px] mt-1 text-center font-bold ${
          active ? "text-[#587342]" : "text-[#6F8461]"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
