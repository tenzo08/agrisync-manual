import { UserRole } from "../context/AuthContext";

export const ROLES: { label: string; value: UserRole; emoji: string }[] = [
  { label: "Farmer", value: "farmer", emoji: "🌾" },
  { label: "Assistant", value: "assistant", emoji: "👤" },
  { label: "Buyer", value: "buyer", emoji: "🏪" },
  { label: "Co-op Leader", value: "coop_leader", emoji: "👑" },
];

export const SIGN_IN_TABS: { label: string; roles: UserRole[] }[] = [
  { label: "Assistant", roles: ["assistant"] },
  { label: "Co-op Leader", roles: ["coop_leader"] },
  { label: "Buyer", roles: ["buyer"] },
];
