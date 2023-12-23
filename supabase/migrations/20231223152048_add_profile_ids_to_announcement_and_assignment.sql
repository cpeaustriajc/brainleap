ALTER TABLE "public"."announcements"
ADD COLUMN "profile_id" uuid,
    ADD CONSTRAINT "profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE CASCADE;
ALTER TABLE "public"."assignments"
ADD COLUMN "profile_id" uuid,
    ADD CONSTRAINT "profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE CASCADE;
