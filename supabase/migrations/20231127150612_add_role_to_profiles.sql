create type role_type as enum ('student', 'instructor');

alter table profiles add column role role_type not null default 'student';
