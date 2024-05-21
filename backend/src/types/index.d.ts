import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string | null;
      role: "leader" | "secretary" | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  }
}
