import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Persona } from "./Persona";
@Entity("funcionario", { schema: "public" })
@Index("funcionario_pkey", ["idPersona"], { unique: true })
export class Funcionario {
  @Column("integer", { primary: true, name: "id_persona" })
  idPersona: number;


  @Column("character varying", {
    name: "estado",
    nullable: true,
    length: 8,
    default: () => "'ACTIVO'",
  })
  estado: string | null;

  @OneToOne(() => Persona, (persona) => persona.funcionario)
  @JoinColumn([{ name: "id_persona", referencedColumnName: "id" }])
  idPersona2: Persona;
}
