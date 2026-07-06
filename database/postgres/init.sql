-- Initial schema for learning PostgreSQL
-- Runs automatically when the Docker container is first created

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    password_hash VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data
INSERT INTO users (email, display_name)
VALUES ('learner@devlab.local', 'Lab Learner')
ON CONFLICT (email) DO NOTHING;

INSERT INTO todos (user_id, title)
SELECT id, 'Learn Git basics' FROM users WHERE email = 'learner@devlab.local'
ON CONFLICT DO NOTHING;
