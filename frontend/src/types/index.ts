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

export type AppointmentStatusType = "accept" | "reject" | "suspend" | "default";

export interface Appointment {
  id: string;
  guestName: string;
  arriveDate: Date;
  enterDate: Date;
  status?: AppointmentStatusType;
  leaderId: string;
  secretaryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
