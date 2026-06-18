import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

export type UserRole = "farmer" | "assistant" | "coop_leader" | "buyer";

export interface MockUser {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
}

interface AuthContextType {
  user: MockUser | null;
  isLoading: boolean;
  error: string | null;
  signIn: (phone: string, pin: string) => Promise<void>;
  signUp: (
    name: string,
    phone: string,
    pin: string,
    role: UserRole,
  ) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function normalizePhone(raw: string) {
  return raw.replace(/\s+/g, "").replace(/^(\+63|0063)/, "0");
}

function toEmail(phone: string) {
  return `${phone}@agrisync.app`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isSigningUp = useRef(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (isSigningUp.current) return;

        if (session?.user) {
          await loadUser(session.user.id);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadUser(id: string) {
    const { data } = await supabase
      .from("users")
      .select("id, full_name, phone_number, role")
      .eq("id", id)
      .single();

    if (data) {
      setUser({
        id: data.id,
        name: data.full_name,
        phone: data.phone_number,
        role: data.role as UserRole,
      });
    }
  }

  async function signIn(phone: string, pin: string) {
    setIsLoading(true);
    setError(null);

    const clean = normalizePhone(phone);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: toEmail(clean),
      password: pin,
    });

    if (authError) {
      setError("Mali ang numero o PIN. Subukan muli.");
      setIsLoading(false);
    }
  }

  async function signUp(
    name: string,
    phone: string,
    pin: string,
    role: UserRole,
  ) {
    setIsLoading(true);
    setError(null);
    isSigningUp.current = true;

    const clean = normalizePhone(phone);

    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("phone_number", clean)
      .maybeSingle();

    if (existing) {
      setError("Ang numerong ito ay nakarehistro na.");
      setIsLoading(false);
      isSigningUp.current = false;
      return;
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email: toEmail(clean),
      password: pin,
    });

    if (authError || !data.user) {
      setError(authError?.message ?? "Hindi ma-register. Subukan muli.");
      setIsLoading(false);
      isSigningUp.current = false;
      return;
    }

    const { error: dbError } = await supabase.from("users").insert({
      id: data.user.id,
      full_name: name,
      phone_number: clean,
      pin_hash: pin,
      role,
    });

    if (dbError) {
      setError(dbError.message);
      setIsLoading(false);
      isSigningUp.current = false;
      return;
    }

    const newUser: MockUser = { id: data.user.id, name, phone: clean, role };
    setUser(newUser);
    setIsLoading(false);
    isSigningUp.current = false;

    switch (role) {
      case "farmer":
      case "assistant":
        router.replace("/farmer/dashboard");
        break;
      case "coop_leader":
        router.replace("/leader/dashboard");
        break;
      case "buyer":
        router.replace("/buyer/marketplace");
        break;
      default:
        router.replace("/auth/signin");
    }
  }

  function signOut() {
    supabase.auth.signOut();
    router.replace("/auth/signin");
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, signIn, signUp, signOut, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
