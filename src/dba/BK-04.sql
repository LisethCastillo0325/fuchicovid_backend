INSERT INTO medicamento (id_medicamento, nombre_medicamento) VALUES (default, 'Mixamorranilo300'), (default, 'Choclometanol400'), (default, 'Chichanosol800');

INSERT INTO laboratorio (id, id_ciudad, nombre, direccion) VALUES (default, (select id from ciudad where nombre = 'CALI' LIMIT 1), 'BAYER', 'Carrera 25 #10-12' );
INSERT INTO laboratorio (id, id_ciudad, nombre, direccion) VALUES (default, (select id from ciudad where nombre = 'CALI' LIMIT 1), 'Stelar', 'Carrera 10 #22-10' );
INSERT INTO laboratorio (id, id_ciudad, nombre, direccion) VALUES (default, (select id from ciudad where nombre = 'CALI' LIMIT 1), 'Biora', 'Carrera 82 #71-08' );
INSERT INTO laboratorio (id, id_ciudad, nombre, direccion) VALUES (default, (select id from ciudad where nombre = 'CALI' LIMIT 1), 'Lafrancol', 'Carrera 15 #36-09' );

INSERT INTO medicamento_laboratorio (id, id_medicamento, id_laboratorio, stock_medicamento) VALUES (default, 1, 1, 100);
INSERT INTO medicamento_laboratorio (id, id_medicamento, id_laboratorio, stock_medicamento) VALUES (default, 2, 1, 10);
INSERT INTO medicamento_laboratorio (id, id_medicamento, id_laboratorio, stock_medicamento) VALUES (default, 3, 1, 1);

ALTER TABLE registro_dosis ADD COLUMN cantidad INTEGER NOT NULL;


-- TRIGGUER
/*
 * cuando el doctor entra al sistema debe existir una opción para saber las reservas de los medicamentos por cada laboratorio y solicitarlos    por ese mismo medio, al hacerlo se debe ir decrementando las unidades de almacenaje en el laboratorio que el doctor seleccionó.
 * Sobre la tabla "registro_dosis", después de que se haga el insert (AFTER INSERT) se debe actualizar la tabla "medicamento_laboratorio" descontando la "dosis" al campo "stock medicamento"
 */

CREATE OR REPLACE FUNCTION public.tr_actualiza_stock_medicamento()
  RETURNS trigger AS
$BODY$ 
DECLARE 
	r_record RECORD;
BEGIN 
	SELECT 
		stock_medicamento, 
		med.nombre_medicamento,
		lab.nombre as nombre_laboratorio
		INTO r_record
	FROM medicamento_laboratorio ml
	JOIN medicamento med ON med.id_medicamento = ml.id_medicamento
	JOIN laboratorio lab ON lab.id = ml.id_laboratorio
	WHERE ml.id = NEW.id_medicamento_laboratorio;

	IF FOUND THEN
		IF r_record.stock_medicamento < NEW.cantidad THEN 
			RAISE EXCEPTION 'No hay satock disponible para el medicamento % en el laboratorio %, stock actual %',
				r_record.nombre_medicamento,
				r_record.nombre_laboratorio,
				r_record.stock_medicamento;
		ELSE
			UPDATE medicamento_laboratorio 
			SET stock_medicamento = (stock_medicamento - NEW.cantidad)
			WHERE medicamento_laboratorio.id = NEW.id_medicamento_laboratorio;
		END IF;
	END IF;

	RETURN NEW; 
END; 
$BODY$
LANGUAGE plpgsql VOLATILE
COST 100;

-- Trigger: trg_actualiza_stock_medicamento on public.registro_dosis

-- DROP TRIGGER trg_actualiza_stock_medicamento ON public.registro_dosis;

CREATE TRIGGER trg_actualiza_stock_medicamento
  AFTER INSERT
  ON public.registro_dosis
  FOR EACH ROW
  EXECUTE PROCEDURE public.tr_actualiza_stock_medicamento();

  -- PRUEBAS
  -- select * from laboratorio
  -- select * from medicamento
  -- select * from medicamento_laboratorio
  
  -- BEGIN; -- ROLLBACK
  -- INSERT INTO registro_dosis (id, id_medicamento_laboratorio, cantidad, dosis) VALUES (default, 3, 10, '1 cada 8 horas');
  -- INSERT INTO registro_dosis (id, id_medicamento_laboratorio, cantidad, dosis) VALUES (default, 1, 10, '1 cada 8 horas');