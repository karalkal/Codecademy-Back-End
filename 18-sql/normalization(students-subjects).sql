-- move from large table to specific, then delete irrelevant columns but keep identifier to connect to newly created table
-- Assume we have 1 table with student name and major1, major 2etc. he is enrolled in. We need to normalize it with:
    -- 1. A majors table listing each unique major and the number of credits required
    -- NB  for simplicity, we are assuming that all possible majors are represented in the major_1 column, no need of major_2
CREATE TABLE majors AS
SELECT distinct major_1, major_1_credits_reqd
FROM college;

    -- 2. A cross-reference table that matches students with majors. 
CREATE TABLE students_majors AS
SELECT major_1 as major, student_id 
FROM college
UNION ALL
SELECT major_2 as major, student_id
FROM college
WHERE major_2 IS NOT NULL;

    -- 3. delete redundant columns
ALTER TABLE college
DROP COLUMN major_1, 
DROP COLUMN major_2, 
DROP COLUMN major_1_credits_reqd,
DROP COLUMN major_2_credits_reqd;
    -- 4. test
SELECT * FROM students_majors
ORDER by student_id
LIMIT 10;

-- Few complex queries
-- asked to email students a reminder about the number of credits required for their major(s). 
SELECT student_id, credits_reqd
FROM students, students_majors, majors
WHERE students.id = students_majors.student_id
AND students_majors.major_id = majors.id;
-- to calculatwe total (some have 2 majors)
SELECT student_id, SUM(credits_reqd) as total_credits
FROM students, students_majors, majors
WHERE students.id = students_majors.student_id
AND students_majors.major_id = majors.id
GROUP by student_id;
-- Note that, because you are grouping by student_id, you will need to aggregate any other column you query; However, because the email column is unique for every student_id, it doesn’t matter how you aggregate. We can, for example, use MIN(email)
SELECT student_id, SUM(credits_reqd) as total_credits, MIN(email) as student_email
FROM students, students_majors, majors
WHERE students.id = students_majors.student_id
AND students_majors.major_id = majors.id
GROUP by student_id;




