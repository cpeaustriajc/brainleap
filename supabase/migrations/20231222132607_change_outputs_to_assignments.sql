ALTER TABLE "public"."outputs"
    RENAME TO "assignments";
ALTER TABLE "public"."assignments" DROP COLUMN "profile_id",
    DROP COLUMN "post_id", ADD COLUMN "links" text[];
