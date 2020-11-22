import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Persona } from "./Persona";

@Index("persona_direccion_direccion_key", ["direccion"], { unique: true })
@Index("persona_direccion_pkey", ["id"], { unique: true })
@Entity("persona_direccion", { schema: "public" })
export class PersonaDireccion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "direccion",
    nullable: true,
    unique: true,
  })
  direccion: string | null;

  @Column("character varying", { name: "barrio", nullable: true })
  barrio: string | null;

  @ManyToOne(() => Persona, (persona) => persona.personaDireccions)
  @JoinColumn([{ name: "id_persona", referencedColumnName: "id" }])
  idPersona: Persona;
}
