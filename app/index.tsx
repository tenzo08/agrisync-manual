import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user } = useAuth();

  if (!user) return <Redirect href="/auth/signin" />;

  switch (user.role) {
    case "farmer":
    case "assistant":
      return <Redirect href="/farmer/dashboard" />;
    case "coop_leader":
      return <Redirect href="/leader/dashboard" />;
    case "buyer":
      return <Redirect href="/buyer/marketplace" />;
    default:
      return <Redirect href="/auth/signin" />;
  }
}
