export interface User {
  id: string;
  username: string;
  role: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSignInCredentials {
  username: string;
  password: string;
}

export interface UserSignUpCredentials {
  username: string;
  password: string;
  role: number;
}
