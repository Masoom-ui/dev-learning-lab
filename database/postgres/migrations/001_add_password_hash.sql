-- Lesson 8: auth — add password column for registered users
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
