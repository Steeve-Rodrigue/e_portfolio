CREATE TABLE visitors (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page        text NOT NULL,
  referrer    text,
  country     text,
  city        text,
  device      text,
  browser     text,
  duration_s  int,
  visited_at  timestamp DEFAULT now()
);

CREATE INDEX idx_visitors_page       ON visitors(page);
CREATE INDEX idx_visitors_visited_at ON visitors(visited_at DESC);
