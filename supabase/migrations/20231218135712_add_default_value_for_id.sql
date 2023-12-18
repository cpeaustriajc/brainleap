ALTER TABLE enrollments ALTER COLUMN enrollment_id SET DEFAULT uuid_generate_v4();
ALTER TABLE courses ALTER COLUMN course_id SET DEFAULT uuid_generate_v4();
ALTER TABLE posts ALTER COLUMN post_id SET DEFAULT uuid_generate_v4();
