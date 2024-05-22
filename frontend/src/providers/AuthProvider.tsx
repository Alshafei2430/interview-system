import React, { useEffect, useState } from "react";
import auth from "../api/auth";
import { User, UserSignInCredentials } from "../types";
import axios from "@/axios";
import { Loader } from "../components/Loader";

interface AuthContextType {
  user: User | null;
  signIn: (
    userCredentials: UserSignInCredentials,
    callback: VoidFunction
  ) => void;
  getAuthStatus: () => Promise<
    | {
        isAuthenticated: boolean;
        message: string;
        data: any;
      }
    | {
        isAuthenticated: boolean;
        message: any;
        data?: undefined;
      }
  >;
  //   signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (
    userCredentials: UserSignInCredentials,
    callback: VoidFunction
  ) => {
    const response = await auth.signIn(userCredentials);

    if (!response.isAuthenticated) {
      console.log(response);
      return;
    }
    setUser(response.data.user);
    callback();
  };

  const getAuthStatus = async () => {
    const response = await auth.authStatus();

    if (!response.isAuthenticated) {
      console.log(response);
    }

    return response;
  };

  //   const signout = (callback: VoidFunction) => {
  //     return auth.signout(() => {
  //       setUser(null);
  //       callback();
  //     });
  //   };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("auth/status");
        console.log({ response });
        setUser(response.data.user);
      } catch (error) {
        // setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = { user, signIn, getAuthStatus };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}
