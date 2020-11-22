import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("medicamento_pkey", ["idMedicamento"], { unique: true })
@Entity("medicamento", { schema: "public" })
export class Medicamento {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_medicamento" })
  idMedicamento: number;

  @Column("character varying", { name: "nombre_medicamento", nullable: true })
  nombreMedicamento: string | null;
}
