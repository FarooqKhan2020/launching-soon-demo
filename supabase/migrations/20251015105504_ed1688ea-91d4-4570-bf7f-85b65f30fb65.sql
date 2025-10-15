-- Create signups table
CREATE TABLE public.signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public read for stats, no direct write from frontend)
CREATE POLICY "Public can view signup count"
ON public.signups
FOR SELECT
USING (true);

-- Create index for faster duplicate checks
CREATE INDEX idx_signups_email ON public.signups(email);
CREATE INDEX idx_signups_created_at ON public.signups(created_at DESC);