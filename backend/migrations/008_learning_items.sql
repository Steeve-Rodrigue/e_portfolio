CREATE TABLE learning_items (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type          text NOT NULL CHECK (type IN ('paper', 'course', 'competition', 'current')),
  title         text NOT NULL,
  source        text,
  url           text,
  progress_pct  int CHECK (progress_pct BETWEEN 0 AND 100),
  is_current    boolean DEFAULT false,
  status        text,
  started_at    date
);
