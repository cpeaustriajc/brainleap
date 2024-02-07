CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS trigger
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
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
        new.raw_user_meta_data->>'username'
    );
return new;
end;$$;
