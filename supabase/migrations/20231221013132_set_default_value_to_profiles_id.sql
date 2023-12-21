ALTER TABLE courses ALTER instructor_id
SET DEFAULT auth.uid();
