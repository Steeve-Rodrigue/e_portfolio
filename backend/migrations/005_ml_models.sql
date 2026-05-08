CREATE TABLE ml_models (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name         text NOT NULL,
  endpoint     text NOT NULL,
  framework    text,
  description  text,
  accuracy     float,
  metrics      jsonb,
  is_active    boolean DEFAULT true,
  deployed_at  timestamp DEFAULT now()
);
