import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ciudad } from "./Ciudad";
import { Pais } from "./Pais";

@Index("departamento_pkey", ["id"], { unique: true })
@Index("departamento_nombre_key", ["nombre"], { unique: true })
@Entity("departamento", { schema: "public" })
export class Departamento {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, unique: true })
  nombre: string | null;

  @OneToMany(() => Ciudad, (ciudad) => ciudad.idDepartamento)
  ciudads: Ciudad[];

  @ManyToOne(() => Pais, (pais) => pais.departamentos)
  @JoinColumn([{ name: "id_pais", referencedColumnName: "id" }])
  idPais: Pais;
}
