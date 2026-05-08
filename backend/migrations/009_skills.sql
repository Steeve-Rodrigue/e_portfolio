CREATE TABLE skills (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  category      text NOT NULL,
  cluster       text NOT NULL,
  icon_devicon  text,
  mastery_level int CHECK (mastery_level BETWEEN 1 AND 5),
  featured      boolean DEFAULT false,
  display_order int DEFAULT 0
);
