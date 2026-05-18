ALTER TABLE projects
    ADD COLUMN properties text,
    ADD COLUMN context jsonb,
    ADD COLUMN problematic jsonb,
    ALTER COLUMN methodology TYPE jsonb USING NULL,
    DROP COLUMN problem_statement;
