alter table "public"."profiles"
alter column "username" drop not null;
set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.get_username_from_email(email_address text) RETURNS text LANGUAGE plpgsql AS $function$DECLARE username text;
BEGIN -- split the email by @ and get the first part
username := regexp_replace(email_address, '@.+|[^a-zA-Z0-9]+', '', 'g');
RETURN username;
END;
$function$;
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $function$begin
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
end;
$function$;
