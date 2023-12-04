ALTER TABLE public.classes RENAME TO courses;

ALTER TABLE courses RENAME COLUMN class_id TO course_id;

ALTER TABLE courses RENAME COLUMN class_name TO course_name;

ALTER TABLE courses RENAME COLUMN class_description TO course_description;

ALTER TABLE enrollments RENAME COLUMN class_id TO course_id;

ALTER TABLE assignments RENAME COLUMN class_id TO course_id;
