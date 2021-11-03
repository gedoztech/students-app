CREATE TABLE IF NOT EXISTS public.migrations
(
  id uuid DEFAULT gen_random_uuid(),
  file character varying NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  CONSTRAINT pk_migrations PRIMARY KEY (id)
);
