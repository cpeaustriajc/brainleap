ALTER TABLE posts ALTER created_at TYPE timestamptz USING created_at::timestamptz;

ALTER TABLE outputs ALTER submitted_at TYPE timestamptz USING submitted_at::timestamptz;
