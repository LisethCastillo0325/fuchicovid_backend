import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProfesionalSalud } from "./ProfesionalSalud";

@Index("entidad_promotora_salud_pkey", ["id"], { unique: true })
@Index("entidad_promotora_salud_nombre_key", ["nombre"], { unique: true })
@Entity("entidad_promotora_salud", { schema: "public" })
export class EntidadPromotoraSalud {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, unique: true })
  nombre: string | null;

  @OneToMany(
    () => ProfesionalSalud,
    (profesionalSalud) => profesionalSalud.idEps
  )
  profesionalSaluds: ProfesionalSalud[];
}
