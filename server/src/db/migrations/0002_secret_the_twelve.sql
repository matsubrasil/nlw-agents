ALTER TABLE "questions" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "created_at" SET DEFAULT now();