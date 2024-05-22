import { isAxiosError } from "axios";
import axios from "../axios";
import { UserSignInCredentials, UserSignUpCredentials } from "../types";

const signIn = async (userCredentials: UserSignInCredentials) => {
  try {
    const response = await axios.post("auth/login", userCredentials);

    if (response.status !== 200) {
      return {
        isAuthenticated: false,
        message: response.statusText,
      };
    }

    return {
      isAuthenticated: true,
      message: response.statusText,
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        isAuthenticated: false,
        message: error.response?.data.message,
      };
    } else {
      return {
        isAuthenticated: false,
        message: "خطاء في السرفر",
      };
    }
  }
};

const signUp = async (userCredentials: UserSignUpCredentials) => {
  try {
    const response = await axios.post("auth/signup", userCredentials);

    if (response.status !== 200) {
      return {
        isAuthenticated: false,
        message: response.statusText,
      };
    }
    return {
      isAuthenticated: true,
      message: response.statusText,
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        isAuthenticated: false,
        message: error.response?.data.message,
      };
    } else {
      return {
        isAuthenticated: false,
        message: "خطاء في السرفر",
      };
    }
  }
};

// sign out
// const signOut;

const authStatus = async () => {
  try {
    const response = await axios.get("auth/status");

    if (response.status !== 200) {
      return {
        isAuthenticated: false,
        message: response.statusText,
      };
    }
    return {
      isAuthenticated: true,
      message: response.statusText,
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        isAuthenticated: false,
        message: error.response?.data.message,
      };
    } else {
      return {
        isAuthenticated: false,
        message: "خطاء في السرفر",
      };
    }
  }
};

export default { signIn, signUp, authStatus };
