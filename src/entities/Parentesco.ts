import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RelacionPacienteIntegrante } from "./RelacionPacienteIntegrante";

@Index("parentesco_pkey", ["id"], { unique: true })
@Entity("parentesco", { schema: "public" })
export class Parentesco {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(
    () => RelacionPacienteIntegrante,
    (relacionPacienteIntegrante) => relacionPacienteIntegrante.idParentesco
  )
  relacionPacienteIntegrantes: RelacionPacienteIntegrante[];
}
