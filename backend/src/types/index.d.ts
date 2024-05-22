import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string | null;
      role: number | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  }
}
