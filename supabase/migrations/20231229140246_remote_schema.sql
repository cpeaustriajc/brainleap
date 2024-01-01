alter table "storage"."buckets" drop constraint "buckets_owner_fkey";

alter table "storage"."buckets" add column "owner_id" text;

alter table "storage"."objects" add column "owner_id" text;


