import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { PersonaTelefonos } from "./PersonaTelefonos";
import { TelefonoLaboratorio } from "./TelefonoLaboratorio";

@Index("tipo_telefono_pkey", ["id"], { unique: true })
@Entity("tipo_telefono", { schema: "public" })
export class TipoTelefono {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(
    () => PersonaTelefonos,
    (personaTelefonos) => personaTelefonos.idTipoTelefono2
  )
  personaTelefonos: PersonaTelefonos[];

  @OneToMany(
    () => TelefonoLaboratorio,
    (telefonoLaboratorio) => telefonoLaboratorio.idTipoTelefono
  )
  telefonoLaboratorios: TelefonoLaboratorio[];
}
