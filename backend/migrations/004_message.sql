CREATE TABLE messages (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  email         text NOT NULL,
  project_type  text,
  message       text NOT NULL,
  is_read       boolean DEFAULT false,
  created_at    timestamp DEFAULT now()
);
