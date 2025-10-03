-- Create user access tracking table
CREATE TABLE public.user_access_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  accessed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_access_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own access logs
CREATE POLICY "Users can view their own access logs"
ON public.user_access_logs
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for inserting access logs (authenticated users only)
CREATE POLICY "Authenticated users can insert access logs"
ON public.user_access_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX idx_user_access_logs_user_id ON public.user_access_logs(user_id);
CREATE INDEX idx_user_access_logs_accessed_at ON public.user_access_logs(accessed_at DESC);