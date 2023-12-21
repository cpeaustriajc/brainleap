UPDATE courses
SET instructor_id = profiles.profile_id
FROM profiles
WHERE courses.instructor_id = profiles.profile_Id;
ALTER TABLE courses
ADD CONSTRAINT fk_instructor_id FOREIGN KEY (instructor_id) REFERENCES profiles (profile_id);
