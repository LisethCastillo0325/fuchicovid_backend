import {
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CorreoIntegranteHogar } from "./CorreoIntegranteHogar";
import { Persona } from "./Persona";
import { PersonaTelefonos } from "./PersonaTelefonos";
import { RelacionPacienteIntegrante } from "./RelacionPacienteIntegrante";

@Index("integrante_hogar_pkey", ["idPersona"], { unique: true })
@Entity("integrante_hogar", { schema: "public" })
export class IntegranteHogar {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_persona" })
  idPersona: number;


  @OneToMany(
    () => CorreoIntegranteHogar,
    (correoIntegranteHogar) => correoIntegranteHogar.idIntegranteHogar
  )
  correoIntegranteHogars: CorreoIntegranteHogar[];

  @OneToOne(() => Persona, (persona) => persona.integranteHogar)
  @JoinColumn([{ name: "id_persona", referencedColumnName: "id" }])
  idPersona2: Persona;

  @OneToMany(
    () => RelacionPacienteIntegrante,
    (relacionPacienteIntegrante) => relacionPacienteIntegrante.idIntegrante
  )
  relacionPacienteIntegrantes: RelacionPacienteIntegrante[];

  @OneToMany(
    () => PersonaTelefonos,
    (personaTelefonos) => personaTelefonos.idPersona
  )
  personaTelefonos: PersonaTelefonos[];
}
