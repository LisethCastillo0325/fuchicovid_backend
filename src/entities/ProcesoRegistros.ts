import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Persona } from "./Persona";

@Index("proceso_registros_pkey", ["id"], { unique: true })
@Entity("proceso_registros", { schema: "public" })
export class ProcesoRegistros {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("time without time zone", { name: "hora", nullable: true })
  hora: string | null;

  @ManyToOne(() => Persona, (persona) => persona.procesoRegistros)
  @JoinColumn([{ name: "id_persona_registrada", referencedColumnName: "id" }])
  idPersonaRegistrada: Persona;

  @ManyToOne(() => Persona, (persona) => persona.procesoRegistros2)
  @JoinColumn([{ name: "id_persona_registrador", referencedColumnName: "id" }])
  idPersonaRegistrador: Persona;
}
