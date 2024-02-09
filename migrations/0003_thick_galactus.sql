CREATE TABLE IF NOT EXISTS "users_to_roles" (
	"applications_id" uuid NOT NULL,
	"roles_id" uuid NOT NULL,
	"users_id" uuid NOT NULL,
	CONSTRAINT "users_to_roles_applications_id_roles_id_users_id_pk" PRIMARY KEY("applications_id","roles_id","users_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_applications_id_applciations_id_fk" FOREIGN KEY ("applications_id") REFERENCES "applciations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_roles_id_roles_id_fk" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
