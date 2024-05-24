import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string | null;
      role: number | null;
      leader?: string;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  }
}
