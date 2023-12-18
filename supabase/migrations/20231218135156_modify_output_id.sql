ALTER TABLE outputs DROP COLUMN id;
ALTER TABLE outputs ADD COLUMN output_id UUID PRIMARY KEY DEFAULT uuid_generate_v4();

