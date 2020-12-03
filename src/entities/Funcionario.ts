import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Persona } from "./Persona";
@Entity("funcionario", { schema: "public" })
@Index("funcionario_pkey", ["idPersona"], { unique: true })
export class Funcionario {
  @Column("integer", { primary: true, name: "id_persona" })
  idPersona: number;



  @OneToOne(() => Persona, (persona) => persona.funcionario)
  @JoinColumn([{ name: "id_persona", referencedColumnName: "id" }])
  idPersona2: Persona;
}
