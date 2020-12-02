ALTER TABLE tipo_identificacion ADD COLUMN estado CHARACTER VARYING (8) CHECK (estado = ANY(ARRAY['ACTIVO', 'INACTIVO']));

ALTER TABLE tipo_identificacion ALTER COLUMN estado SET DEFAULT 'ACTIVO';

UPDATE tipo_identificacion SET estado = 'ACTIVO';