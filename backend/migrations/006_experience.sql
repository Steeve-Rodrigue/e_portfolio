CREATE TABLE experience (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type          text NOT NULL CHECK (type IN ('job', 'education')),
  company       text NOT NULL,
  role          text NOT NULL,
  description   text,
  impact_metric text,
  start_date    date NOT NULL,
  end_date      date,
  is_current    boolean DEFAULT false,
  logo_url      text,
  display_order int DEFAULT 0
);
