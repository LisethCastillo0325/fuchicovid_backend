import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { TipoTelefono } from "./TipoTelefono";

@Index("persona_telefonos_pkey", ["id"], { unique: true })
@Index("persona_telefonos_telefono_key", ["telefono"], { unique: true })
@Entity("persona_telefonos", { schema: "public" })
export class PersonaTelefonos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "telefono",
    nullable: true,
    unique: true,
  })
  telefono: string | null;

  @ManyToOne(() => Persona, (persona) => persona.personaTelefonos)
  @JoinColumn([{ name: "id_persona", referencedColumnName: "id" }])
  idPersona: Persona;

  @ManyToOne(
    () => PersonaTelefonos,
    (personaTelefonos) => personaTelefonos.personaTelefonos
  )
  @JoinColumn([{ name: "id_tipo_telefono", referencedColumnName: "id" }])
  idTipoTelefono: PersonaTelefonos;

  @OneToMany(
    () => PersonaTelefonos,
    (personaTelefonos) => personaTelefonos.idTipoTelefono
  )
  personaTelefonos: PersonaTelefonos[];

  @ManyToOne(
    () => TipoTelefono,
    (tipoTelefono) => tipoTelefono.personaTelefonos
  )
  @JoinColumn([{ name: "id_tipo_telefono", referencedColumnName: "id" }])
  idTipoTelefono2: TipoTelefono;
}
