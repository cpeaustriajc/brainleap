CREATE TABLE outputs (
    id SERIAL PRIMARY KEY,
    profile_id UUID REFERENCES profiles(profile_id),
    post_id UUID REFERENCES posts(post_id),
    grade INTEGER CHECK (
        grade BETWEEN 0 AND 100
    ),
    file_path text [],
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE posts ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE posts DROP COLUMN files;
