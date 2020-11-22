import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Laboratorio } from "./Laboratorio";
import { RegistroDosis } from "./RegistroDosis";

@Index("medicamento_laboratorio_pkey", ["id"], { unique: true })
@Entity("medicamento_laboratorio", { schema: "public" })
export class MedicamentoLaboratorio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "id_medicamento", nullable: true })
  idMedicamento: number | null;

  @Column("integer", { name: "stock_medicamento", nullable: true })
  stockMedicamento: number | null;

  @ManyToOne(
    () => Laboratorio,
    (laboratorio) => laboratorio.medicamentoLaboratorios
  )
  @JoinColumn([{ name: "id_laboratorio", referencedColumnName: "id" }])
  idLaboratorio: Laboratorio;

  @OneToMany(
    () => RegistroDosis,
    (registroDosis) => registroDosis.idMedicamentoLaboratorio
  )
  registroDoses: RegistroDosis[];
}
