ALTER TABLE "public"."courses" RENAME COLUMN "course_id" TO "id";
ALTER TABLE "public"."courses" RENAME COLUMN "course_name" TO "name";
ALTER TABLE "public"."courses" RENAME COLUMN "course_description" TO "description";
ALTER TABLE "public"."courses" RENAME COLUMN "subject" TO "category";
ALTER TABLE "public"."courses" RENAME COLUMN "instructor_id" TO "instructor";
