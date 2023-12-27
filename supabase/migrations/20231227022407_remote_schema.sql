create table "public"."outputs" (
    "output_id" uuid not null default uuid_generate_v4(),
    "grade" integer,
    "attachment" text not null,
    "student_id" uuid
);


CREATE UNIQUE INDEX outputs_pkey1 ON public.outputs USING btree (output_id);

alter table "public"."outputs" add constraint "outputs_pkey1" PRIMARY KEY using index "outputs_pkey1";

alter table "public"."outputs" add constraint "outputs_student_id_fkey" FOREIGN KEY (student_id) REFERENCES profiles(profile_id) not valid;

alter table "public"."outputs" validate constraint "outputs_student_id_fkey";

grant delete on table "public"."outputs" to "anon";

grant insert on table "public"."outputs" to "anon";

grant references on table "public"."outputs" to "anon";

grant select on table "public"."outputs" to "anon";

grant trigger on table "public"."outputs" to "anon";

grant truncate on table "public"."outputs" to "anon";

grant update on table "public"."outputs" to "anon";

grant delete on table "public"."outputs" to "authenticated";

grant insert on table "public"."outputs" to "authenticated";

grant references on table "public"."outputs" to "authenticated";

grant select on table "public"."outputs" to "authenticated";

grant trigger on table "public"."outputs" to "authenticated";

grant truncate on table "public"."outputs" to "authenticated";

grant update on table "public"."outputs" to "authenticated";

grant delete on table "public"."outputs" to "service_role";

grant insert on table "public"."outputs" to "service_role";

grant references on table "public"."outputs" to "service_role";

grant select on table "public"."outputs" to "service_role";

grant trigger on table "public"."outputs" to "service_role";

grant truncate on table "public"."outputs" to "service_role";

grant update on table "public"."outputs" to "service_role";


