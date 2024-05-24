import { createContext, useEffect, useState } from "react";
import auth from "../api/auth";
import { User, UserSignInCredentials } from "../types";
import axios from "@/axios";
import { Loader } from "../components/Loader";
import { getSocket } from "@/socket";
import { useConnection } from "../hooks/useConnection";
interface AuthContextType {
  user: User | null;
  signIn: (
    userCredentials: UserSignInCredentials,
    callback: VoidFunction
  ) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { changeConnectionStatus } = useConnection();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const socket = getSocket();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("auth/status");
        setUser(response.data.user);
        socket.connect();
        changeConnectionStatus(true);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [socket, changeConnectionStatus]);

  const signIn = async (
    userCredentials: UserSignInCredentials,
    callback: VoidFunction
  ) => {
    const response = await auth.signIn(userCredentials);

    if (!response.isAuthenticated) {
      console.log(response);
      return;
    }
    socket.connect();
    changeConnectionStatus(true);
    setUser(response.data.user);
    callback();
  };

  const value = { user, signIn };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}
