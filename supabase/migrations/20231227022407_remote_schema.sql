
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."post_type" AS ENUM (
    'assignment',
    'announcement'
);

ALTER TYPE "public"."post_type" OWNER TO "postgres";

CREATE TYPE "public"."role_type" AS ENUM (
    'student',
    'instructor'
);

ALTER TYPE "public"."role_type" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_username_from_email"("email_address" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$ BEGIN RETURN split_part(email_address, '@', 1);
END;
$$;

ALTER FUNCTION "public"."get_username_from_email"("email_address" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$ begin
insert into public.profiles (
        profile_id,
        full_name,
        avatar_url,
        email,
        username
    )
values (
        new.id,
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'avatar_url',
        new.raw_user_meta_data->>'email',
        get_username_from_email(new.raw_user_meta_data->>'email')
    );
return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."announcements" (
    "announcement_id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "course_id" "text",
    "title" "text",
    "description" "text",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "profile_id" "uuid",
    "attachment" "text",
    "links" "text"
);

ALTER TABLE "public"."announcements" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."assignments" (
    "grade" integer,
    "submitted_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "assignment_id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "profile_id" "uuid",
    "course_id" "text",
    "link" "text",
    "attachment" "text",
    "title" "text",
    "description" "text",
    "due_date" timestamp with time zone,
    CONSTRAINT "outputs_grade_check" CHECK ((("grade" >= 0) AND ("grade" <= 100)))
);

ALTER TABLE "public"."assignments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."courses" (
    "course_id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "course_name" "text" NOT NULL,
    "course_description" "text",
    "section" "text",
    "subject" "text",
    "room" "text",
    "instructor_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."courses" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."enrollments" (
    "enrollment_id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "course_id" "text"
);

ALTER TABLE "public"."enrollments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."outputs" (
    "output_id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "grade" integer,
    "attachment" "text" NOT NULL,
    "student_id" "uuid"
);

ALTER TABLE "public"."outputs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "profile_id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text" NOT NULL,
    "full_name" "text",
    "avatar_url" "text",
    "email" "text" NOT NULL,
    "biography" "text",
    "university" "text",
    "section" "text",
    "program" "text",
    "position" "text",
    "role" "public"."role_type" DEFAULT 'student'::"public"."role_type",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."announcements"
    ADD CONSTRAINT "assignments_pkey" PRIMARY KEY ("announcement_id");

ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "classes_pkey" PRIMARY KEY ("course_id");

ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_pkey" PRIMARY KEY ("enrollment_id");

ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_user_id_class_id_key" UNIQUE ("user_id", "course_id");

ALTER TABLE ONLY "public"."assignments"
    ADD CONSTRAINT "outputs_pkey" PRIMARY KEY ("assignment_id");

ALTER TABLE ONLY "public"."outputs"
    ADD CONSTRAINT "outputs_pkey1" PRIMARY KEY ("output_id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("profile_id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."announcements"
    ADD CONSTRAINT "assignments_class_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id");

ALTER TABLE ONLY "public"."assignments"
    ADD CONSTRAINT "course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_class_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id");

ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("profile_id");

ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "fk_instructor_id" FOREIGN KEY ("instructor_id") REFERENCES "public"."profiles"("profile_id");

ALTER TABLE ONLY "public"."outputs"
    ADD CONSTRAINT "outputs_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("profile_id");

ALTER TABLE ONLY "public"."announcements"
    ADD CONSTRAINT "profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."assignments"
    ADD CONSTRAINT "profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "profile_id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "profile_id"));

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."get_username_from_email"("email_address" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_username_from_email"("email_address" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_username_from_email"("email_address" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."announcements" TO "anon";
GRANT ALL ON TABLE "public"."announcements" TO "authenticated";
GRANT ALL ON TABLE "public"."announcements" TO "service_role";

GRANT ALL ON TABLE "public"."assignments" TO "anon";
GRANT ALL ON TABLE "public"."assignments" TO "authenticated";
GRANT ALL ON TABLE "public"."assignments" TO "service_role";

GRANT ALL ON TABLE "public"."courses" TO "anon";
GRANT ALL ON TABLE "public"."courses" TO "authenticated";
GRANT ALL ON TABLE "public"."courses" TO "service_role";

GRANT ALL ON TABLE "public"."enrollments" TO "anon";
GRANT ALL ON TABLE "public"."enrollments" TO "authenticated";
GRANT ALL ON TABLE "public"."enrollments" TO "service_role";

GRANT ALL ON TABLE "public"."outputs" TO "anon";
GRANT ALL ON TABLE "public"."outputs" TO "authenticated";
GRANT ALL ON TABLE "public"."outputs" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
