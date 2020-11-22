import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PacienteControles } from "./PacienteControles";
import { RegistroDosis } from "./RegistroDosis";

@Index("item_paciente_controles_medicamentos_pkey", ["id"], { unique: true })
@Entity("item_paciente_controles_medicamentos", { schema: "public" })
export class ItemPacienteControlesMedicamentos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(
    () => PacienteControles,
    (pacienteControles) => pacienteControles.itemPacienteControlesMedicamentos
  )
  @JoinColumn([{ name: "id_paciente_control", referencedColumnName: "id" }])
  idPacienteControl: PacienteControles;

  @ManyToOne(
    () => RegistroDosis,
    (registroDosis) => registroDosis.itemPacienteControlesMedicamentos
  )
  @JoinColumn([{ name: "id_registro_dosis", referencedColumnName: "id" }])
  idRegistroDosis: RegistroDosis;
}
