import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProfesionalSalud } from "./ProfesionalSalud";

@Index("universidad_pkey", ["id"], { unique: true })
@Index("universidad_nombre_key", ["nombre"], { unique: true })
@Entity("universidad", { schema: "public" })
export class Universidad {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, unique: true })
  nombre: string | null;

  @OneToMany(
    () => ProfesionalSalud,
    (profesionalSalud) => profesionalSalud.idUniversidad
  )
  profesionalSaluds: ProfesionalSalud[];
}
