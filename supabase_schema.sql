-- Yapti Learn - Supabase Database Schema
-- Run this script in the Supabase SQL Editor

-- 1. Create Tables

CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
    language TEXT DEFAULT 'es' CHECK (language IN ('es', 'mi', 'ma')),
    avatar_url TEXT,
    community TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    level TEXT,
    category TEXT,
    teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    pdf_url TEXT,
    audio_url TEXT,
    content TEXT,
    order_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, course_id)
);

CREATE TABLE lesson_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, lesson_id)
);

CREATE TABLE quizzes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    correct_answer TEXT NOT NULL CHECK (correct_answer IN ('a', 'b', 'c')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE quiz_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    certificate_url TEXT NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, course_id)
);

-- 2. Setup Row Level Security (RLS)

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone."
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile."
ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Courses Policies
CREATE POLICY "Courses are viewable by everyone."
ON courses FOR SELECT USING (true);

CREATE POLICY "Teachers can insert courses."
ON courses FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('teacher', 'admin'))
);

CREATE POLICY "Teachers can update their own courses."
ON courses FOR UPDATE USING (
    auth.uid() = teacher_id OR 
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Teachers can delete their own courses."
ON courses FOR DELETE USING (
    auth.uid() = teacher_id OR 
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Lessons Policies
CREATE POLICY "Lessons are viewable by everyone."
ON lessons FOR SELECT USING (true);

CREATE POLICY "Teachers can manage lessons for their courses."
ON lessons FOR ALL USING (
    EXISTS (
        SELECT 1 FROM courses 
        WHERE courses.id = lessons.course_id 
        AND (courses.teacher_id = auth.uid() OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
    )
);

-- Enrollments Policies
CREATE POLICY "Users can view their own enrollments."
ON enrollments FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Users can enroll themselves."
ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Lesson Progress Policies
CREATE POLICY "Users can view and update their own progress."
ON lesson_progress FOR ALL USING (auth.uid() = user_id);

-- Quizzes Policies
CREATE POLICY "Quizzes are viewable by everyone."
ON quizzes FOR SELECT USING (true);

CREATE POLICY "Teachers can manage quizzes."
ON quizzes FOR ALL USING (
    EXISTS (
        SELECT 1 FROM lessons
        JOIN courses ON courses.id = lessons.course_id
        WHERE lessons.id = quizzes.lesson_id
        AND (courses.teacher_id = auth.uid() OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
    )
);

-- Quiz Results Policies
CREATE POLICY "Users can view their own results."
ON quiz_results FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Users can insert their own results."
ON quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Certificates Policies
CREATE POLICY "Users can view their own certificates."
ON certificates FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- 3. Functions & Triggers

-- Trigger to automatically create a profile after auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
