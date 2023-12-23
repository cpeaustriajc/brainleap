ALTER TABLE "posts" RENAME TO "announcements";

ALTER TABLE "announcements" RENAME COLUMN "post_id" TO "announcement_id";
