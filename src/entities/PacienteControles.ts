import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemPacienteControlesMedicamentos } from "./ItemPacienteControlesMedicamentos";
import { Paciente } from "./Paciente";
import { ProfesionalSalud } from "./ProfesionalSalud";

@Index("paciente_controles_pkey", ["id"], { unique: true })
@Entity("paciente_controles", { schema: "public" })
export class PacienteControles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("time without time zone", { name: "hora", nullable: true })
  hora: string | null;

  @Column("double precision", {
    name: "temperatura",
    nullable: true,
    precision: 53,
  })
  temperatura: number | null;

  @Column("double precision", { name: "peso", nullable: true, precision: 53 })
  peso: number | null;

  @Column("integer", { name: "presion diastolica", nullable: true })
  presionDiastolica: number | null;

  @Column("integer", { name: "presion sistolica", nullable: true })
  presionSistolica: number | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @OneToMany(
    () => ItemPacienteControlesMedicamentos,
    (itemPacienteControlesMedicamentos) =>
      itemPacienteControlesMedicamentos.idPacienteControl
  )
  itemPacienteControlesMedicamentos: ItemPacienteControlesMedicamentos[];

  @ManyToOne(() => Paciente, (paciente) => paciente.pacienteControles)
  @JoinColumn([{ name: "id_paciente", referencedColumnName: "idPersona" }])
  idPaciente: Paciente;

  @ManyToOne(
    () => ProfesionalSalud,
    (profesionalSalud) => profesionalSalud.pacienteControles
  )
  @JoinColumn([
    { name: "id_profesional_salud", referencedColumnName: "idPersona" },
  ])
  idProfesionalSalud: ProfesionalSalud;
}
