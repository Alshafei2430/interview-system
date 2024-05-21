ALTER TABLE "user" RENAME COLUMN "password" TO "hashed_password";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_hashed_password_unique" UNIQUE("hashed_password");