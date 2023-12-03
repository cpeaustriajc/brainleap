CREATE TYPE role_type AS ENUM ('student', 'instructor');
alter table profiles add column role role_type not null default 'student';
