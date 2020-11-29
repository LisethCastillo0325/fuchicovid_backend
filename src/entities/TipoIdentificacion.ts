import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Persona } from "./Persona";

@Index("tipo_identificacion_pkey", ["id"], { unique: true })
@Entity("tipo_identificacion", { schema: "public" })
export class TipoIdentificacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("character varying", {
    name: "estado",
    nullable: true,
    length: 8,
    default: () => "'ACTIVO'",
  })
  estado: string | null;

  @OneToMany(() => Persona, (persona) => persona.idTipoIdentificacion)
  personas: Persona[];
}
