import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IntegranteHogar } from "./IntegranteHogar";
import { Paciente } from "./Paciente";
import { Parentesco } from "./Parentesco";

@Index("relacion_paciente_integrante_pkey", ["id"], { unique: true })
@Entity("relacion_paciente_integrante", { schema: "public" })
export class RelacionPacienteIntegrante {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(
    () => IntegranteHogar,
    (integranteHogar) => integranteHogar.relacionPacienteIntegrantes
  )
  @JoinColumn([{ name: "id_integrante", referencedColumnName: "idPersona" }])
  idIntegrante: IntegranteHogar;

  @ManyToOne(() => Paciente, (paciente) => paciente.relacionPacienteIntegrantes)
  @JoinColumn([{ name: "id_paciente", referencedColumnName: "idPersona" }])
  idPaciente: Paciente;

  @ManyToOne(
    () => Parentesco,
    (parentesco) => parentesco.relacionPacienteIntegrantes
  )
  @JoinColumn([{ name: "id_parentesco", referencedColumnName: "id" }])
  idParentesco: Parentesco;
}
