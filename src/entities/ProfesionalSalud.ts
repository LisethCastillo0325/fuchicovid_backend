import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Paciente } from "./Paciente";
import { PacienteControles } from "./PacienteControles";
import { EntidadPromotoraSalud } from "./EntidadPromotoraSalud";
import { Persona } from "./Persona";
import { Universidad } from "./Universidad";

@Index("profesional_salud_pkey", ["idPersona"], { unique: true })
@Entity("profesional_salud", { schema: "public" })
export class ProfesionalSalud {
  @Column("integer", { primary: true, name: "id_persona" })
  idPersona: number;

  @OneToMany(() => Paciente, (paciente) => paciente.idDoctorEncargado)
  pacientes: Paciente[];

  @OneToMany(
    () => PacienteControles,
    (pacienteControles) => pacienteControles.idProfesionalSalud
  )
  pacienteControles: PacienteControles[];

  @ManyToOne(
    () => EntidadPromotoraSalud,
    (entidadPromotoraSalud) => entidadPromotoraSalud.profesionalSaluds
  )
  @JoinColumn([{ name: "id_eps", referencedColumnName: "id" }])
  idEps: EntidadPromotoraSalud;

  @OneToOne(() => Persona, (persona) => persona.profesionalSalud)
  @JoinColumn([{ name: "id_persona", referencedColumnName: "id" }])
  idPersona2: Persona;

  @ManyToOne(() => Universidad, (universidad) => universidad.profesionalSaluds)
  @JoinColumn([{ name: "id_universidad", referencedColumnName: "id" }])
  idUniversidad: Universidad;
}
