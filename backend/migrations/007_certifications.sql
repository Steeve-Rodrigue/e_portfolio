CREATE TABLE certifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  issuer     text NOT NULL,
  url        text,
  issued_at  date,
  badge_url  text
);
