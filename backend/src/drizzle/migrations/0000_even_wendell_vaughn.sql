DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('accept', 'reject', 'suspend', 'default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guest_name" varchar NOT NULL,
	"arrive_date" timestamp DEFAULT now(),
	"enter_date" timestamp,
	"status" "status" DEFAULT 'default',
	"leader_id" uuid NOT NULL,
	"secretary_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"hashed_password" varchar NOT NULL,
	"role" smallint NOT NULL,
	"leader" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_hashed_password_unique" UNIQUE("hashed_password")
);
