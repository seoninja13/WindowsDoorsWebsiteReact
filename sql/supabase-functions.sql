-- Function to get the service status
CREATE OR REPLACE FUNCTION get_service_status()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN jsonb_build_object(
    'status', 'ok',
    'timestamp', now(),
    'version', current_setting('server_version')
  );
END;
$$;

-- Function to create a test table
CREATE OR REPLACE FUNCTION create_test_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'test_table'
  ) THEN
    -- Create the test table
    CREATE TABLE public.test_table (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
    );
    
    -- Set up RLS policies
    ALTER TABLE public.test_table ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "Allow anonymous select" ON public.test_table
      FOR SELECT USING (true);
      
    CREATE POLICY "Allow anonymous insert" ON public.test_table
      FOR INSERT WITH CHECK (true);
  END IF;
END;
$$;
