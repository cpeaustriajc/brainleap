ALTER TABLE "public"."announcements" DROP COLUMN "attachments",
    ADD COLUMN "attachment" text;
ALTER TABLE "public"."announcements" DROP COLUMN "links",
    ADD COLUMN "links" text;
ALTER TABLE "public"."assignments" DROP COLUMN "links",
    ADD COLUMN "link" text;
ALTER TABLE "public"."assignments" DROP COLUMN "attachments",
    ADD COLUMN "attachment" text;
