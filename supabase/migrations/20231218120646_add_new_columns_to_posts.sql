CREATE TYPE post_type AS ENUM('assignment', 'announcement');
ALTER TABLE posts
ADD COLUMN type post_type NOT NULL DEFAULT 'announcement';
