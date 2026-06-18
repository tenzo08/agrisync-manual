import { router } from "expo-router";
import React, { createContext, ReactNode, useContext, useState } from "react";

export type UserRole = "farmer" | "assistant" | "leader" | "buyer";

export interface MockUser {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
}

// Mock user accounts — replace with Appwrite calls in T1.3
const MOCK_USERS: (MockUser & { pin: string })[] = [
  {
    id: "1",
    name: "Juan dela Cruz",
    phone: "09171234567",
    pin: "1234",
    role: "farmer",
  },
  {
    id: "2",
    name: "Carlo dela Cruz",
    phone: "09179999999",
    pin: "1234",
    role: "assistant",
  },
  {
    id: "3",
    name: "Maria Santos",
    phone: "09181234567",
    pin: "5678",
    role: "leader",
  },
  {
    id: "4",
    name: "Pedro Reyes",
    phone: "09191234567",
    pin: "9012",
    role: "buyer",
  },
];

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(phone: string, pin: string) {
    setIsLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const normalizedPhone = phone
      .replace(/\s+/g, "")
      .replace(/^(\+63|0063)/, "0");
    const found = MOCK_USERS.find(
      (u) => u.phone === normalizedPhone && u.pin === pin,
    );

    if (!found) {
      setError("Incorrect phone number or PIN. Please try again.");
      setIsLoading(false);
      return;
    }

    const { pin: _pin, ...safeUser } = found;
    setUser(safeUser);
    setIsLoading(false);

    // Role-based routing (T1.3c)
    switch (safeUser.role) {
      case "leader":
        router.replace("/leader/dashboard");
        break;
      case "buyer":
        router.replace("/buyer/marketplace");
        break;
      case "farmer":
      case "assistant":
        router.replace("/farmer/dashboard");
        break;
      default:
        router.replace("/auth/signin");
        break;
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

    await new Promise((r) => setTimeout(r, 800));

    const normalizedPhone = phone
      .replace(/\s+/g, "")
      .replace(/^(\+63|0063)/, "0");
    const exists = MOCK_USERS.find((u) => u.phone === normalizedPhone);

    if (exists) {
      setError("An account with this phone number already exists.");
      setIsLoading(false);
      return;
    }

    const newUser: MockUser = {
      id: String(Date.now()),
      name,
      phone: normalizedPhone,
      role,
    };

    // In V1 mock mode we just set the user directly
    // TODO: Replace with Appwrite account.create() + T1.3a POST /auth/register
    setUser(newUser);
    setIsLoading(false);

    switch (role) {
      case "leader":
        router.replace("/leader/dashboard");
        break;
      case "buyer":
        router.replace("/buyer/marketplace");
        break;

      default:
        router.replace("/auth/signin");
        break;
    }
  }

  function signOut() {
    setUser(null);
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
