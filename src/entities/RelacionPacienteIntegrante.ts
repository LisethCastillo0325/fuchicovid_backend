import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IntegranteHogar } from "./IntegranteHogar";
import { Paciente } from "./Paciente";

@Index("relacion_paciente_integrante_pkey", ["id"], { unique: true })
@Entity("relacion_paciente_integrante", { schema: "public" })
export class RelacionPacienteIntegrante {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "parentesco", nullable: true })
  parentesco: string | null;

  @ManyToOne(
    () => IntegranteHogar,
    (integranteHogar) => integranteHogar.relacionPacienteIntegrantes
  )
  @JoinColumn([{ name: "id_integrante", referencedColumnName: "idPersona" }])
  idIntegrante: IntegranteHogar;

  @ManyToOne(() => Paciente, (paciente) => paciente.relacionPacienteIntegrantes)
  @JoinColumn([{ name: "id_paciente", referencedColumnName: "idPersona" }])
  idPaciente: Paciente;
}
