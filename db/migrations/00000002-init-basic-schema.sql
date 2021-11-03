CREATE TABLE IF NOT EXISTS public.students
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying NOT NULL,
    cpf character(11) NOT NULL,
    email character varying NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_at timestamp with time zone DEFAULT NULL,
    CONSTRAINT pk_students PRIMARY KEY (id),
    CONSTRAINT uk_cpf UNIQUE (cpf)
);
