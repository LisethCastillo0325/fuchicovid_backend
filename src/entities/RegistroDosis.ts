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
import { MedicamentoLaboratorio } from "./MedicamentoLaboratorio";

@Index("registro_dosis_pkey", ["id"], { unique: true })
@Entity("registro_dosis", { schema: "public" })
export class RegistroDosis {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "dosis", nullable: true })
  dosis: string | null;

  @OneToMany(
    () => ItemPacienteControlesMedicamentos,
    (itemPacienteControlesMedicamentos) =>
      itemPacienteControlesMedicamentos.idRegistroDosis
  )
  itemPacienteControlesMedicamentos: ItemPacienteControlesMedicamentos[];

  @ManyToOne(
    () => MedicamentoLaboratorio,
    (medicamentoLaboratorio) => medicamentoLaboratorio.registroDoses
  )
  @JoinColumn([
    { name: "id_medicamento_laboratorio", referencedColumnName: "id" },
  ])
  idMedicamentoLaboratorio: MedicamentoLaboratorio;
}
