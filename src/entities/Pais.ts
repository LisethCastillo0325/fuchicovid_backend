import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Departamento } from "./Departamento";

@Index("pais_pkey", ["id"], { unique: true })
@Index("pais_nombre_key", ["nombre"], { unique: true })
@Entity("pais", { schema: "public" })
export class Pais {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, unique: true })
  nombre: string | null;

  @OneToMany(() => Departamento, (departamento) => departamento.idPais)
  departamentos: Departamento[];
}
