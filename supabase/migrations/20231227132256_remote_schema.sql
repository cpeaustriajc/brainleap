alter table "public"."assignments" drop constraint "outputs_grade_check";

alter table "public"."assignments" drop constraint "profile_id_fk";

alter table "public"."assignments" drop column "grade";

alter table "public"."assignments" drop column "profile_id";

alter table "public"."assignments" drop column "submitted_at";

alter table "public"."assignments" add column "instructor_id" uuid;

alter table "public"."outputs" add column "assignment_id" uuid;

alter table "public"."outputs" add column "submitted_at" timestamp with time zone;

alter table "public"."assignments" add constraint "assignments_instructor_id_fkey" FOREIGN KEY (instructor_id) REFERENCES profiles(profile_id) ON DELETE CASCADE not valid;

alter table "public"."assignments" validate constraint "assignments_instructor_id_fkey";

alter table "public"."outputs" add constraint "outputs_assignment_id_fkey" FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id) ON DELETE CASCADE not valid;

alter table "public"."outputs" validate constraint "outputs_assignment_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_username_from_email(email_address text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$DECLARE
  username text;
BEGIN
  -- split the email by @ and get the first part
  username := regexp_replace(email_address, '@.+|[^a-zA-Z0-9]+', '', 'g');
  RETURN username;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
insert into public.profiles (
        profile_id,
        full_name,
        avatar_url,
        email
    )
values (
        new.id,
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'avatar_url',
        new.raw_user_meta_data->>'email'
    );
return new;
end;$function$
;


