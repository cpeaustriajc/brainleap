ALTER TABLE "public"."assignments"
ADD COLUMN "course_id" text,
    ADD CONSTRAINT "course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE CASCADE;
