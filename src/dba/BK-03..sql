CREATE DATABASE bd_fuchicovid
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;


CREATE TABLE "persona" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "id_tipo_identificacion" int,
  "numero_identificacion" varchar(10) UNIQUE
);

CREATE TABLE "tipo_identificacion" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar
);

CREATE TABLE "persona_direccion" (
  "id" SERIAL PRIMARY KEY,
  "id_persona" int,
  "direccion" varchar UNIQUE,
  "barrio" varchar
);
CREATE TABLE "persona_telefonos" (
  "id" SERIAL PRIMARY KEY,
  "id_persona" int,
  "id_tipo_telefono" int,
  "telefono" varchar UNIQUE
);

CREATE TABLE "tipo_telefono" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar
);

CREATE TABLE "pais" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar UNIQUE
);

CREATE TABLE "departamento" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar UNIQUE,
  "id_pais" int
);

CREATE TABLE "ciudad" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar UNIQUE,
  "id_departamento" int
);

CREATE TABLE "paciente" (
  "id_persona" int PRIMARY KEY,
  "id_doctor_encargado" int,
  "latitud" numeric,
  "longitud" numeric,
  "numero_integrantes_hogar" int,
  "id_ciudad_contagio" int,
  "estado_enfermedad" varchar
);

CREATE TABLE "universidad" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar UNIQUE
);

CREATE TABLE "entidad_promotora_salud" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar UNIQUE
);

CREATE TABLE "profesional_salud" (
  "id_persona" int PRIMARY KEY,
  "id_universidad" int,
  "id_eps" int
);

CREATE TABLE "funcionario" (
  "id_persona" int PRIMARY KEY
);

CREATE TABLE "usuario" (
  "id" SERIAL PRIMARY KEY,
  "id_persona" int,
  "password" varchar UNIQUE,
  "login" varchar UNIQUE
);

CREATE TABLE "paciente_controles" (
  "id" SERIAL PRIMARY KEY,
  "id_profesional_salud" int,
  "id_paciente" int,
  "fecha" date,
  "hora" time,
  "temperatura" double precision,
  "peso" double precision,
  "presion diastolica" int,
  "presion sistolica" int,
  "observaciones" text
);

CREATE TABLE "proceso_registros" (
  "id" SERIAL PRIMARY KEY,
  "id_persona_registrada" int,
  "id_persona_registrador" int,
  "fecha" date,
  "hora" time
);

CREATE TABLE "item_paciente_controles_medicamentos" (
  "id" SERIAL PRIMARY KEY,
  "id_paciente_control" int,
  "id_registro_dosis" int
);

CREATE TABLE "registro_dosis" (
  "id" SERIAL PRIMARY KEY,
  "id_medicamento_laboratorio" int,
  "dosis" varchar
);

CREATE TABLE "medicamento" (
  "id_medicamento" SERIAL PRIMARY KEY,
  "nombre_medicamento" varchar
);

CREATE TABLE "medicamento_laboratorio" (
  "id" SERIAL PRIMARY KEY,
  "id_medicamento" int,
  "id_laboratorio" int,
  "stock_medicamento" int
);

CREATE TABLE "laboratorio" (
  "id" SERIAL PRIMARY KEY,
  "id_ciudad" int,
  "nombre" varchar UNIQUE,
  "direccion" varchar UNIQUE
);

CREATE TABLE "telefono_laboratorio" (
  "id" SERIAL PRIMARY KEY,
  "id_laboratorio" int,
  "id_tipo_telefono" int,
  "telefono" int UNIQUE
);

CREATE TABLE "integrante_hogar" (
  "id_persona" SERIAL PRIMARY KEY
);

CREATE TABLE "relacion_paciente_integrante" (
  "id" SERIAL PRIMARY KEY,
  "id_paciente" int,
  "id_integrante" int,
  "parentesco" varchar
);

CREATE TABLE "correo_integrante_hogar" (
  "id" SERIAL PRIMARY KEY,
  "id_integrante_hogar" int,
  "correo" varchar UNIQUE
);

CREATE TABLE "tipo_contacto" (
  "id" SERIAL PRIMARY KEY,
  "tipo_contacto" varchar
);

CREATE TABLE "contacto_emergencia" (
  "id" SERIAL PRIMARY KEY,
  "id_paciente" int,
  "id_integrante_hogar" int,
  "id_tipo_contacto" int
);

ALTER TABLE "persona" ADD CONSTRAINT "fk_persona_id_tipo_identificacion" FOREIGN KEY ("id_tipo_identificacion") REFERENCES "tipo_identificacion" ("id");

ALTER TABLE "persona_telefonos" ADD FOREIGN KEY ("id_persona") REFERENCES "persona" ("id");

ALTER TABLE "persona_direccion" ADD FOREIGN KEY ("id_persona") REFERENCES "persona" ("id");

ALTER TABLE "persona_telefonos" ADD FOREIGN KEY ("id_tipo_telefono") REFERENCES "tipo_telefono" ("id");

ALTER TABLE "departamento" ADD FOREIGN KEY ("id_pais") REFERENCES "pais" ("id");

ALTER TABLE "ciudad" ADD FOREIGN KEY ("id_departamento") REFERENCES "departamento" ("id");

ALTER TABLE "paciente" ADD FOREIGN KEY ("id_persona") REFERENCES "persona" ("id");

ALTER TABLE "paciente" ADD FOREIGN KEY ("id_ciudad_contagio") REFERENCES "ciudad" ("id");

ALTER TABLE "profesional_salud" ADD FOREIGN KEY ("id_persona") REFERENCES "persona" ("id");

ALTER TABLE "profesional_salud" ADD FOREIGN KEY ("id_universidad") REFERENCES "universidad" ("id");

ALTER TABLE "profesional_salud" ADD FOREIGN KEY ("id_eps") REFERENCES "entidad_promotora_salud" ("id");

ALTER TABLE "funcionario" ADD FOREIGN KEY ("id_persona") REFERENCES "persona" ("id");

ALTER TABLE "usuario" ADD FOREIGN KEY ("id_persona") REFERENCES "persona" ("id");

ALTER TABLE "paciente_controles" ADD FOREIGN KEY ("id_profesional_salud") REFERENCES "profesional_salud" ("id_persona");

ALTER TABLE "paciente_controles" ADD FOREIGN KEY ("id_paciente") REFERENCES "paciente" ("id_persona");

ALTER TABLE "proceso_registros" ADD FOREIGN KEY ("id_persona_registrada") REFERENCES "persona" ("id");

ALTER TABLE "proceso_registros" ADD FOREIGN KEY ("id_persona_registrador") REFERENCES "persona" ("id");

ALTER TABLE "item_paciente_controles_medicamentos" ADD FOREIGN KEY ("id_paciente_control") REFERENCES "paciente_controles" ("id");

ALTER TABLE "item_paciente_controles_medicamentos" ADD FOREIGN KEY ("id_registro_dosis") REFERENCES "registro_dosis" ("id");

ALTER TABLE "registro_dosis" ADD FOREIGN KEY ("id_medicamento_laboratorio") REFERENCES "medicamento_laboratorio" ("id");

ALTER TABLE "medicamento_laboratorio" ADD FOREIGN KEY ("id_laboratorio") REFERENCES "laboratorio" ("id");

ALTER TABLE "telefono_laboratorio" ADD FOREIGN KEY ("id_laboratorio") REFERENCES "laboratorio" ("id");

ALTER TABLE "laboratorio" ADD FOREIGN KEY ("id_ciudad") REFERENCES "ciudad" ("id");

ALTER TABLE "telefono_laboratorio" ADD FOREIGN KEY ("id_tipo_telefono") REFERENCES "tipo_telefono" ("id");

ALTER TABLE "integrante_hogar" ADD FOREIGN KEY ("id_persona") REFERENCES "persona" ("id");

ALTER TABLE "relacion_paciente_integrante" ADD FOREIGN KEY ("id_integrante") REFERENCES "integrante_hogar" ("id_persona");

ALTER TABLE "relacion_paciente_integrante" ADD FOREIGN KEY ("id_paciente") REFERENCES "paciente" ("id_persona");

ALTER TABLE "correo_integrante_hogar" ADD FOREIGN KEY ("id_integrante_hogar") REFERENCES "integrante_hogar" ("id_persona");

ALTER TABLE "contacto_emergencia" ADD FOREIGN KEY ("id_integrante_hogar") REFERENCES "integrante_hogar" ("id_persona");

ALTER TABLE "contacto_emergencia" ADD FOREIGN KEY ("id_tipo_contacto") REFERENCES "tipo_contacto" ("id");

ALTER TABLE "persona_telefonos" ADD FOREIGN KEY ("id_tipo_telefono") REFERENCES "persona_telefonos" ("id");
ALTER TABLE tipo_identificacion ADD COLUMN estado CHARACTER VARYING (8) CHECK (estado = ANY(ARRAY['ACTIVO', 'INACTIVO']));

ALTER TABLE tipo_identificacion ALTER COLUMN estado SET DEFAULT 'ACTIVO';

UPDATE tipo_identificacion SET estado = 'ACTIVO';

-- PERSONA
ALTER TABLE persona ADD COLUMN fecha_nacimiento DATE NOT NULL;

ALTER TABLE persona ADD COLUMN estado CHARACTER VARYING (8) CHECK (estado = ANY(ARRAY['ACTIVO', 'INACTIVO']));

ALTER TABLE persona ALTER COLUMN estado SET DEFAULT 'ACTIVO';

UPDATE persona SET estado = 'ACTIVO';


ALTER TABLE paciente ADD CONSTRAINT ck_paciente_estado_enfermedad CHECK (estado_enfermedad = ANY(ARRAY['TRATAMIENTO', 'CURADO']));
-- FIN PACIENTE
--CONSTRAINT A LA DOSIS

-- PARENTESCO
CREATE TABLE parentesco (
	id SERIAL PRIMARY KEY,
	nombre CHARACTER VARYING
);

-- INSERT PARENTESCO
INSERT INTO parentesco (nombre) VALUES ('PADRE');
INSERT INTO parentesco (nombre) VALUES ('MADRE');
INSERT INTO parentesco (nombre) VALUES ('SUEGRO');
INSERT INTO parentesco (nombre) VALUES ('SUEGRA');
INSERT INTO parentesco (nombre) VALUES ('HIJO');
INSERT INTO parentesco (nombre) VALUES ('HIJA');
INSERT INTO parentesco (nombre) VALUES ('YERNO');
INSERT INTO parentesco (nombre) VALUES ('YERNA');
INSERT INTO parentesco (nombre) VALUES ('ABUELO');
INSERT INTO parentesco (nombre) VALUES ('ABUELA');
INSERT INTO parentesco (nombre) VALUES ('NIETO');
INSERT INTO parentesco (nombre) VALUES ('NIETA');
INSERT INTO parentesco (nombre) VALUES ('HERMANO');
INSERT INTO parentesco (nombre) VALUES ('HERMANA');
INSERT INTO parentesco (nombre) VALUES ('CUÑADO');
INSERT INTO parentesco (nombre) VALUES ('CUÑADA');
INSERT INTO parentesco (nombre) VALUES ('BISABUELO');
INSERT INTO parentesco (nombre) VALUES ('BISABUELA');
INSERT INTO parentesco (nombre) VALUES ('BIZNIETO');
INSERT INTO parentesco (nombre) VALUES ('BIZNIETA');
INSERT INTO parentesco (nombre) VALUES ('TIO');
INSERT INTO parentesco (nombre) VALUES ('TIA');
INSERT INTO parentesco (nombre) VALUES ('SOBRINO');
INSERT INTO parentesco (nombre) VALUES ('SOBRINA');
-- FIN INSERT

ALTER TABLE relacion_paciente_integrante DROP COLUMN parentesco;
ALTER TABLE relacion_paciente_integrante ADD COLUMN id_parentesco INTEGER;
ALTER TABLE relacion_paciente_integrante ADD CONSTRAINT fk_relacion_paciente_integrante_parentesco FOREIGN KEY (id_parentesco)
REFERENCES parentesco (id);
-- FIN PARENTESCO

-- INSERT TIPO CONTACTO
INSERT INTO tipo_contacto (tipo_contacto) VALUES ('FAMILIAR'), ('AMIGO'), ('VECINO');
-- FIN


-- INSERT PAIS
INSERT INTO pais (nombre) VALUES ('COLOMBIA');


-- INSERT DEPARTAMENTO
INSERT INTO departamento (id, nombre, id_pais) VALUES ('1', 'AMAZONAS', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('2', 'ANTIOQUIA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('3', 'ARAUCA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('4', 'ARCHIPIéLAGO DE SAN ANDRéS', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('5', 'ATLáNTICO', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('6', 'BOGOTá D.C.', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('7', 'BOLíVAR', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('8', 'BOYACá', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('9', 'CALDAS', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('10', 'CAQUETá', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('11', 'CASANARE', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('12', 'CAUCA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('13', 'CESAR', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('14', 'CHOCó', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('15', 'CóRDOBA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('16', 'CUNDINAMARCA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('17', 'GUAINíA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('18', 'GUAVIARE', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('19', 'HUILA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('20', 'LA GUAJIRA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('21', 'MAGDALENA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('22', 'META', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('23', 'NARIñO', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('24', 'NORTE DE SANTANDER', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('25', 'PUTUMAYO', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('26', 'QUINDíO', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('27', 'RISARALDA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('28', 'SANTANDER', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('29', 'SUCRE', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('30', 'TOLIMA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('31', 'VALLE DEL CAUCA', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('32', 'VAUPéS', 1);
INSERT INTO departamento (id, nombre, id_pais) VALUES ('33', 'VICHADA', 1);


-- CIUDAD
ALTER TABLE ciudad DROP CONSTRAINT ciudad_nombre_key;
ALTER TABLE ciudad ADD CONSTRAINT uq_ciudad_nombre_departamento UNIQUE (nombre, id_departamento);

-- INSERT CIUDAD

INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'MIRITI PARANá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'LETICIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'EL ENCANTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'LA CHORRERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'LA PEDRERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'LA VICTORIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'PUERTO ARICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'PUERTO NARIñO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'PUERTO SANTANDER');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'TARAPACá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 1, 'PUERTO ALEGRíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'MEDELLíN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ABEJORRAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ABRIAQUí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ALEJANDRíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'AMAGá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'AMALFI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ANDES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ANGELóPOLIS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ANGOSTURA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ANORí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ANZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'APARTADó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ARBOLETES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ARGELIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ARMENIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'BARBOSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'BELLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'BETANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'BETULIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CIUDAD BOLíVAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'BRICEñO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'BURITICá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CáCERES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CAICEDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CALDAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CAMPAMENTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CAñASGORDAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CARACOLí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CARAMANTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CAREPA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CAROLINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CAUCASIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CHIGORODó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CISNEROS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'COCORNá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CONCEPCIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'CONCORDIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'COPACABANA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'DABEIBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'DON MATíAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'EBéJICO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'EL BAGRE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ENTRERRIOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ENVIGADO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'FREDONIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'GIRALDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'GIRARDOTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'GóMEZ PLATA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'GUADALUPE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'GUARNE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'GUATAPé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'HELICONIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'HISPANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ITAGUI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ITUANGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'JERICó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'LA CEJA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'LA ESTRELLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'LA PINTADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'LA UNIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'LIBORINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'MACEO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'MARINILLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'MONTEBELLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'MURINDó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'MUTATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'NARIñO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'NECOCLí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'NECHí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'OLAYA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'PEñOL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'PEQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'PUEBLORRICO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'PUERTO BERRíO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'PUERTO NARE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'PUERTO TRIUNFO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'REMEDIOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'RETIRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'RIONEGRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SABANALARGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SABANETA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SALGAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN FRANCISCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN JERóNIMO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN LUIS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN PEDRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN RAFAEL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN ROQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN VICENTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SANTA BáRBARA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SANTO DOMINGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'EL SANTUARIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SEGOVIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SOPETRáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'TáMESIS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'TARAZá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'TARSO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'TITIRIBí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'TOLEDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'TURBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'URAMITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'URRAO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'VALDIVIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'VALPARAíSO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'VEGACHí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'VENECIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'YALí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'YARUMAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'YOLOMBó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'YONDó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'ZARAGOZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'FRONTINO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'GRANADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'JARDíN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SONSóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'BELMIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN PEDRO DE URABA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SANTAFé DE ANTIOQUIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SANTA ROSA DE OSOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN ANDRéS DE CUERQUíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'VIGíA DEL FUERTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN JOSé DE LA MONTAñA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN JUAN DE URABá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'EL CARMEN DE VIBORAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 2, 'SAN CARLOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 3, 'ARAUQUITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 3, 'CRAVO NORTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 3, 'FORTUL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 3, 'PUERTO RONDóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 3, 'SARAVENA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 3, 'TAME');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 3, 'ARAUCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 4, 'PROVIDENCIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 4, 'SAN ANDRéS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'BARRANQUILLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'BARANOA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'CANDELARIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'GALAPA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'LURUACO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'MALAMBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'MANATí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'PIOJó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'POLONUEVO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'SABANAGRANDE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'SABANALARGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'SANTA LUCíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'SANTO TOMáS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'SOLEDAD');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'SUAN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'TUBARá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'USIACURí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'REPELóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'PUERTO COLOMBIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'PONEDERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'JUAN DE ACOSTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'PALMAR DE VARELA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 5, 'CAMPO DE LA CRUZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 6, 'BOGOTá D.C.');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'EL PEñóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'ACHí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'ARENAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'ARJONA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'ARROYOHONDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'CALAMAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'CANTAGALLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'CICUCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'CóRDOBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'CLEMENCIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'EL GUAMO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'MAGANGUé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'MAHATES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'MARGARITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'MONTECRISTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'MOMPóS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'MORALES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'NOROSí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'PINILLOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'REGIDOR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'RíO VIEJO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SAN ESTANISLAO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SAN FERNANDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SAN JUAN NEPOMUCENO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SANTA CATALINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SANTA ROSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SIMITí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SOPLAVIENTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'TALAIGUA NUEVO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'TIQUISIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'TURBACO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'TURBANá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'VILLANUEVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'CARTAGENA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'MARíA LA BAJA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SAN CRISTóBAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'ZAMBRANO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'BARRANCO DE LOBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SANTA ROSA DEL SUR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'HATILLO DE LOBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'EL CARMEN DE BOLíVAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SAN MARTíN DE LOBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'ALTOS DEL ROSARIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SAN JACINTO DEL CAUCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SAN PABLO DE BORBUR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 7, 'SAN JACINTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TIBASOSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TUNJA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'ALMEIDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'AQUITANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'ARCABUCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'BERBEO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'BETéITIVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'BOAVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'BOYACá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'BRICEñO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'BUENA VISTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'BUSBANZá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CALDAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CAMPOHERMOSO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CERINZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CHINAVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CHIQUINQUIRá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CHISCAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CHITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CHITARAQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CHIVATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CóMBITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'COPER');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CORRALES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'COVARACHíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CUBARá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CUCAITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CUíTIVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CHíQUIZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CHIVOR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'DUITAMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'EL COCUY');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'EL ESPINO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'FIRAVITOBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'FLORESTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'GACHANTIVá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'GAMEZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'GARAGOA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'GUACAMAYAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'GUATEQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'GUAYATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'GüICáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'IZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'JENESANO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'JERICó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'LABRANZAGRANDE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'LA CAPILLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'LA VICTORIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'MACANAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'MARIPí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'MIRAFLORES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'MONGUA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'MONGUí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'MONIQUIRá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'MUZO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'NOBSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'NUEVO COLóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'OICATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'OTANCHE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PACHAVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PáEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PAIPA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PAJARITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PANQUEBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PAUNA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PAYA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PESCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PISBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PUERTO BOYACá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'QUíPAMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'RAMIRIQUí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'RáQUIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'RONDóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SABOYá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SáCHICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SAMACá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SAN EDUARDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SAN MATEO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SANTANA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SANTA MARíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SANTA SOFíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SATIVANORTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SATIVASUR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SIACHOQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SOATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SOCOTá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SOCHA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SOGAMOSO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SOMONDOCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SORA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SOTAQUIRá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SORACá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SUSACóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SUTAMARCHáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SUTATENZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TASCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TENZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TIBANá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TINJACá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TIPACOQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TOCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TóPAGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TOTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TURMEQUé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TUTAZá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'UMBITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'VENTAQUEMADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'VIRACACHá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'ZETAQUIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'LA UVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'BELéN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TUNUNGUá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'MOTAVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'CIéNEGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TOGüí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'VILLA DE LEYVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'PAZ DE RíO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SANTA ROSA DE VITERBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SAN PABLO DE BORBUR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SAN LUIS DE GACENO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SAN JOSé DE PARE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'SAN MIGUEL DE SEMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 8, 'TUTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'MANIZALES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'AGUADAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'ANSERMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'ARANZAZU');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'BELALCáZAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'CHINCHINá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'FILADELFIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'LA DORADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'LA MERCED');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'MANZANARES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'MARMATO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'MARULANDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'NEIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'NORCASIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'PáCORA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'PALESTINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'PENSILVANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'RIOSUCIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'RISARALDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'SALAMINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'SAMANá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'SAN JOSé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'SUPíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'VICTORIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'VILLAMARíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'VITERBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 9, 'MARQUETALIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'MILáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'FLORENCIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'ALBANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'CURILLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'EL DONCELLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'EL PAUJIL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'MORELIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'PUERTO RICO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'LA MONTAñITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'SAN VICENTE DEL CAGUáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'SOLANO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'SOLITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'VALPARAíSO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'SAN JOSé DEL FRAGUA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'BELéN DE LOS ANDAQUIES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 10, 'CARTAGENA DEL CHAIRá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'NUNCHíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'MANí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'TáMARA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'OROCUé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'YOPAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'AGUAZUL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'CHáMEZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'HATO COROZAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'LA SALINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'MONTERREY');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'PORE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'RECETOR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'SABANALARGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'SáCAMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'TAURAMENA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'TRINIDAD');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'VILLANUEVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'SAN LUIS DE GACENO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 11, 'PAZ DE ARIPORO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'PáEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'POPAYáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'ALMAGUER');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'ARGELIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'BALBOA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'BOLíVAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'BUENOS AIRES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'CAJIBíO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'CALDONO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'CALOTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'CORINTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'EL TAMBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'FLORENCIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'GUACHENé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'GUAPI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'INZá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'JAMBALó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'LA SIERRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'LA VEGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'LóPEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'MERCADERES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'MIRANDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'MORALES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'PADILLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'PATíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'PIAMONTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'PIENDAMó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'PUERTO TEJADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'PURACé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'ROSAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'SANTA ROSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'SILVIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'SOTARA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'SUáREZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'SUCRE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'TIMBíO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'TIMBIQUí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'TORIBIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'TOTORó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'VILLA RICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'SANTANDER DE QUILICHAO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 12, 'SAN SEBASTIáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'VALLEDUPAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'AGUACHICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'AGUSTíN CODAZZI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'ASTREA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'BECERRIL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'BOSCONIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'CHIMICHAGUA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'CHIRIGUANá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'CURUMANí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'EL COPEY');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'EL PASO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'GAMARRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'GONZáLEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'LA GLORIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'MANAURE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'PAILITAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'PELAYA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'PUEBLO BELLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'LA PAZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'SAN ALBERTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'SAN DIEGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'SAN MARTíN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'TAMALAMEQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'RíO DE ORO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 13, 'LA JAGUA DE IBIRICO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'CARMEN DEL DARIEN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'TADó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'QUIBDó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'ACANDí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'ALTO BAUDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'ATRATO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'BAGADó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'BAHíA SOLANO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'BAJO BAUDó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'BOJAYA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'UNIóN PANAMERICANA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'CéRTEGUI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'CONDOTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'JURADó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'LLORó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'MEDIO ATRATO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'MEDIO BAUDó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'MEDIO SAN JUAN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'NóVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'NUQUí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'RíO IRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'RíO QUITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'RIOSUCIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'SIPí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'UNGUíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'ISTMINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'EL LITORAL DEL SAN JUAN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'EL CANTóN DEL SAN PABLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'EL CARMEN DE ATRATO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'SAN JOSé DEL PALMAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 14, 'BELéN DE BAJIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'MONTELíBANO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'MONTERíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'AYAPEL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'BUENAVISTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'CANALETE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'CERETé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'CHIMá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'CHINú');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'COTORRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'LORICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'LOS CóRDOBAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'MOMIL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'MOñITOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'PLANETA RICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'PUEBLO NUEVO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'PUERTO ESCONDIDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'PURíSIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'SAHAGúN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'SAN ANDRéS SOTAVENTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'SAN ANTERO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'SAN PELAYO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'TIERRALTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'TUCHíN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'VALENCIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'LA APARTADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'PUERTO LIBERTADOR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'SAN BERNARDO DEL VIENTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'SAN JOSé DE URé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'CIéNAGA DE ORO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 15, 'SAN CARLOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'ALBáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'ANOLAIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CHíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'EL PEñóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SOPó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GAMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SASAIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'YACOPí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'ANAPOIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'ARBELáEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'BELTRáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'BITUIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'BOJACá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CABRERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CACHIPAY');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CAJICá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CAPARRAPí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CAQUEZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CHAGUANí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CHIPAQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CHOACHí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CHOCONTá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'COGUA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'COTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CUCUNUBá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'EL COLEGIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'EL ROSAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'FOMEQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'FOSCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'FUNZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'FúQUENE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GACHALA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GACHANCIPá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GACHETá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GIRARDOT');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GRANADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GUACHETá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GUADUAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GUASCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GUATAQUí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GUATAVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'FUSAGASUGá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GUAYABETAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GUTIéRREZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'JERUSALéN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'JUNíN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'LA CALERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'LA MESA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'LA PALMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'LA PEñA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'LA VEGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'LENGUAZAQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'MACHETA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'MADRID');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'MANTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'MEDINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'MOSQUERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'NARIñO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'NEMOCóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'NILO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'NIMAIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'NOCAIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'VENECIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'PACHO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'PAIME');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'PANDI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'PARATEBUENO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'PASCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'PUERTO SALGAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'PULí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'QUEBRADANEGRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'QUETAME');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'QUIPILE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'APULO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'RICAURTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SAN BERNARDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SAN CAYETANO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SAN FRANCISCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'ZIPAQUIRá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SESQUILé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SIBATé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SILVANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SIMIJACA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SOACHA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SUBACHOQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SUESCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SUPATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SUSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SUTATAUSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TABIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TAUSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TENA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TENJO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TIBACUY');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TIBIRITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TOCAIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TOCANCIPá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'TOPAIPí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'UBALá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'UBAQUE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'UNE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'ÚTICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'VIANí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'VILLAGóMEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'VILLAPINZóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'VILLETA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'VIOTá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'ZIPACóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'FACATATIVá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SAN JUAN DE RíO SECO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'VILLA DE SAN DIEGO DE UBATE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'GUAYABAL DE SIQUIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'SAN ANTONIO DEL TEQUENDAMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'AGUA DE DIOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'CARMEN DE CARUPA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 16, 'VERGARA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'INíRIDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'BARRANCO MINAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'MAPIRIPANA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'SAN FELIPE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'PUERTO COLOMBIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'LA GUADALUPE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'CACAHUAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'PANA PANA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 17, 'MORICHAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 18, 'CALAMAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 18, 'SAN JOSé DEL GUAVIARE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 18, 'MIRAFLORES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 18, 'EL RETORNO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'NEIVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'ACEVEDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'AGRADO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'AIPE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'ALGECIRAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'ALTAMIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'BARAYA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'CAMPOALEGRE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'COLOMBIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'ELíAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'GARZóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'GIGANTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'GUADALUPE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'HOBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'IQUIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'ISNOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'LA ARGENTINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'LA PLATA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'NáTAGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'OPORAPA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'PAICOL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'PALERMO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'PALESTINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'PITAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'PITALITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'RIVERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'SALADOBLANCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'SANTA MARíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'SUAZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'TARQUI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'TESALIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'TELLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'TERUEL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'TIMANá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'VILLAVIEJA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'YAGUARá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 19, 'SAN AGUSTíN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'RIOHACHA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'ALBANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'BARRANCAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'DIBULA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'DISTRACCIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'EL MOLINO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'FONSECA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'HATONUEVO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'MAICAO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'MANAURE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'URIBIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'URUMITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'VILLANUEVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'LA JAGUA DEL PILAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 20, 'SAN JUAN DEL CESAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'SANTA BáRBARA DE PINTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'PUEBLO VIEJO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'SANTA MARTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'ALGARROBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'ARACATACA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'ARIGUANí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'CERRO SAN ANTONIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'CHIVOLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'CONCORDIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'EL BANCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'EL PIñON');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'EL RETéN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'FUNDACIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'GUAMAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'NUEVA GRANADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'PEDRAZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'PIVIJAY');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'PLATO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'REMOLINO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'SALAMINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'SAN ZENóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'SANTA ANA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'SITIONUEVO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'TENERIFE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'ZAPAYáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'ZONA BANANERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'CIéNAGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'SAN SEBASTIáN DE BUENAVISTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'SABANAS DE SAN ANGEL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 21, 'PIJIñO DEL CARMEN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'CASTILLA LA NUEVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'VILLAVICENCIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'ACACIAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'CABUYARO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'CUBARRAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'CUMARAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'EL CALVARIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'EL CASTILLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'EL DORADO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'GRANADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'GUAMAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'MAPIRIPáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'MESETAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'LA MACARENA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'URIBE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'LEJANíAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'PUERTO CONCORDIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'PUERTO GAITáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'PUERTO LóPEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'PUERTO LLERAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'PUERTO RICO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'RESTREPO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'SAN JUANITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'SAN MARTíN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'VISTA HERMOSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'BARRANCA DE UPíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'FUENTE DE ORO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'SAN CARLOS DE GUAROA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 22, 'SAN JUAN DE ARAMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'BUESACO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SAN ANDRéS DE TUMACO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'BELéN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'CHACHAGüí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'ARBOLEDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'PASTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'ALBáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'ALDANA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'ANCUYá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'BARBACOAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'COLóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'CONSACA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'CONTADERO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'CóRDOBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'CUASPUD');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'CUMBAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'CUMBITARA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'EL CHARCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'EL PEñOL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'EL ROSARIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'EL TAMBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'FUNES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'GUACHUCAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'GUAITARILLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'GUALMATáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'ILES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'IMUéS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'IPIALES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'LA CRUZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'LA FLORIDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'LA LLANADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'LA TOLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'LA UNIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'LEIVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'LINARES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'LOS ANDES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'MAGüí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'MALLAMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'MOSQUERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'NARIñO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'OLAYA HERRERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'OSPINA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'FRANCISCO PIZARRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'POLICARPA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'POTOSí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'PROVIDENCIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'PUERRES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'PUPIALES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'RICAURTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'ROBERTO PAYáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SAMANIEGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SANDONá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SAN BERNARDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SAN LORENZO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SAN PABLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SANTA BáRBARA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SAPUYES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'TAMINANGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'TANGUA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SANTACRUZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'TúQUERRES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'YACUANQUER');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'SAN PEDRO DE CARTAGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 23, 'EL TABLóN DE GóMEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'PAMPLONA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'PAMPLONITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'CúCUTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'EL CARMEN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'SILOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'CáCOTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'TOLEDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'MUTISCUA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'EL ZULIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'SALAZAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'CUCUTILLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'PUERTO SANTANDER');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'GRAMALOTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'EL TARRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'TEORAMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'ARBOLEDAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'LOURDES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'BOCHALEMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'CONVENCIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'HACARí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'HERRáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'TIBú');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'SAN CAYETANO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'SAN CALIXTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'LA PLAYA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'CHINáCOTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'RAGONVALIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'LA ESPERANZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'VILLA DEL ROSARIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'CHITAGá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'SARDINATA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'ABREGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'LOS PATIOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'OCAñA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'BUCARASICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'SANTIAGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'LABATECA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'CACHIRá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'VILLA CARO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 24, 'DURANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'PUERTO ASíS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'VILLAGARZóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'MOCOA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'COLóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'ORITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'PUERTO CAICEDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'PUERTO GUZMáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'LEGUíZAMO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'SIBUNDOY');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'SAN FRANCISCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'SAN MIGUEL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'SANTIAGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 25, 'VALLE DE GUAMEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'CALARCá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'GéNOVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'ARMENIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'BUENAVISTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'CIRCASIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'CóRDOBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'FILANDIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'LA TEBAIDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'MONTENEGRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'PIJAO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'QUIMBAYA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 26, 'SALENTO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'PEREIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'APíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'BALBOA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'DOSQUEBRADAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'GUáTICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'LA CELIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'LA VIRGINIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'MARSELLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'MISTRATó');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'PUEBLO RICO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'QUINCHíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'SANTUARIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'SANTA ROSA DE CABAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 27, 'BELéN DE UMBRíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CHIMá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CAPITANEJO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'EL PEñóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'PUERTO WILCHES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'PUERTO PARRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'BUCARAMANGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'AGUADA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'ALBANIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'ARATOCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'BARBOSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'BARICHARA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'BARRANCABERMEJA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'BETULIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'BOLíVAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CABRERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CALIFORNIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CARCASí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CEPITá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CERRITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CHARALá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CHARTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CHIPATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CIMITARRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CONCEPCIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CONFINES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CONTRATACIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'COROMORO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'CURITí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'EL GUACAMAYO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'EL PLAYóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'ENCINO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'ENCISO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'FLORIáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'FLORIDABLANCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'GALáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'GAMBITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'GIRóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'GUACA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'GUADALUPE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'GUAPOTá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'GUAVATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'GüEPSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'JESúS MARíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'JORDáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'LA BELLEZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'LANDáZURI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'LA PAZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'LEBRíJA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'LOS SANTOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'MACARAVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'MáLAGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'MATANZA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'MOGOTES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'MOLAGAVITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'OCAMONTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'OIBA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'ONZAGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'PALMAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'PáRAMO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'PIEDECUESTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'PINCHOTE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'PUENTE NACIONAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'RIONEGRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SAN ANDRéS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SAN GIL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SAN JOAQUíN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SAN MIGUEL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SANTA BáRBARA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SIMACOTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SOCORRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SUAITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SUCRE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SURATá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'TONA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'VéLEZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'VETAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'VILLANUEVA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'ZAPATOCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'PALMAS DEL SOCORRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SAN VICENTE DE CHUCURí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SAN JOSé DE MIRANDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SANTA HELENA DEL OPóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SABANA DE TORRES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'EL CARMEN DE CHUCURí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'VALLE DE SAN JOSé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'SAN BENITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 28, 'HATO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SAMPUéS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'COROZAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SINCELEJO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'BUENAVISTA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'CAIMITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'COLOSO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'COVEñAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'CHALáN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'EL ROBLE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'GALERAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'GUARANDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'LA UNIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'LOS PALMITOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'MAJAGUAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'MORROA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'OVEJAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'PALMITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SAN BENITO ABAD');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SAN MARCOS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SAN ONOFRE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SAN PEDRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SUCRE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'TOLú VIEJO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SAN LUIS DE SINCé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SAN JUAN DE BETULIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 29, 'SANTIAGO DE TOLú');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'CASABIANCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ANZOáTEGUI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'IBAGUé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'LíBANO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'LéRIDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'SUáREZ');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ALPUJARRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ALVARADO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'AMBALEMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ARMERO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ATACO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'CAJAMARCA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'CHAPARRAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'COELLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'COYAIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'CUNDAY');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'DOLORES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ESPINAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'FALAN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'FLANDES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'FRESNO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'GUAMO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'HERVEO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'HONDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ICONONZO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'MARIQUITA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'MELGAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'MURILLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'NATAGAIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ORTEGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'PALOCABILDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'PIEDRAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'PLANADAS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'PRADO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'PURIFICACIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'RIO BLANCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'RONCESVALLES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'ROVIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'SALDAñA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'SANTA ISABEL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'VENADILLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'VILLAHERMOSA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'VILLARRICA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'VALLE DE SAN JUAN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'CARMEN DE APICALA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'SAN LUIS');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 30, 'SAN ANTONIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'TULUá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'FLORIDA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'JAMUNDí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'BUENAVENTURA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'EL DOVIO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'ROLDANILLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'ARGELIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'SEVILLA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'ZARZAL');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'EL CERRITO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'CARTAGO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'CAICEDONIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'EL CAIRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'LA UNIóN');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'RESTREPO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'DAGUA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'GUACARí');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'ANSERMANUEVO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'BUGALAGRANDE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'LA VICTORIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'GINEBRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'YUMBO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'OBANDO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'BOLíVAR');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'CALI');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'SAN PEDRO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'GUADALAJARA DE BUGA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'CALIMA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'ANDALUCíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'PRADERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'YOTOCO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'PALMIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'RIOFRíO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'ALCALá');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'VERSALLES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'EL ÁGUILA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'TORO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'CANDELARIA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'LA CUMBRE');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'ULLOA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'TRUJILLO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 31, 'VIJES');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 32, 'YAVARATé');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 32, 'MITú');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 32, 'CARURU');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 32, 'PACOA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 32, 'TARAIRA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 32, 'PAPUNAUA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 33, 'PUERTO CARREñO');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 33, 'LA PRIMAVERA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 33, 'SANTA ROSALíA');
INSERT INTO ciudad (id, id_departamento, nombre) VALUES (default, 33, 'CUMARIBO');

