CREATE OR REPLACE FUNCTION get_username_from_email(email_address text) RETURNS text AS $$ BEGIN RETURN split_part(email_address, '@', 1);
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION "public"."handle_new_user" () RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER AS $$ begin
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
