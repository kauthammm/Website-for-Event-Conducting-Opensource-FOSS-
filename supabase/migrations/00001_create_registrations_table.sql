-- Create registrations table for hackathon participants
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  team_name TEXT NOT NULL,
  skills TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (view registrations)
CREATE POLICY "Allow public read access" ON registrations
  FOR SELECT
  USING (true);

-- Create policy for public insert access (register)
CREATE POLICY "Allow public insert access" ON registrations
  FOR INSERT
  WITH CHECK (true);