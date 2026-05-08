-- messages: admin inbox filters by is_read, orders by created_at
CREATE INDEX idx_messages_is_read ON messages(is_read, created_at DESC);
