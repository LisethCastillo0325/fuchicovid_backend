import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Ciudad } from "./Ciudad";
import { Persona } from "./Persona";
import { PacienteControles } from "./PacienteControles";
import { RelacionPacienteIntegrante } from "./RelacionPacienteIntegrante";

@Index("paciente_pkey", ["idPersona"], { unique: true })
@Entity("paciente", { schema: "public" })
export class Paciente {
  @Column("integer", { primary: true, name: "id_persona" })
  idPersona: number;

  @Column("integer", { name: "id_doctor_encargado", nullable: true })
  idDoctorEncargado: number | null;

  @Column("numeric", { name: "latitud", nullable: true })
  latitud: string | null;

  @Column("numeric", { name: "longitud", nullable: true })
  longitud: string | null;

  @Column("integer", { name: "numero_integrantes_hogar", nullable: true })
  numeroIntegrantesHogar: number | null;

  @Column("character varying", { name: "estado_enfermedad", nullable: true })
  estadoEnfermedad: string | null;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.pacientes)
  @JoinColumn([{ name: "id_ciudad_contagio", referencedColumnName: "id" }])
  idCiudadContagio: Ciudad;

  @OneToOne(() => Persona, (persona) => persona.paciente)
  @JoinColumn([{ name: "id_persona", referencedColumnName: "id" }])
  idPersona2: Persona;

  @OneToMany(
    () => PacienteControles,
    (pacienteControles) => pacienteControles.idPaciente
  )
  pacienteControles: PacienteControles[];

  @OneToMany(
    () => RelacionPacienteIntegrante,
    (relacionPacienteIntegrante) => relacionPacienteIntegrante.idPaciente
  )
  relacionPacienteIntegrantes: RelacionPacienteIntegrante[];
}
