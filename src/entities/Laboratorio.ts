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
import { MedicamentoLaboratorio } from "./MedicamentoLaboratorio";
import { TelefonoLaboratorio } from "./TelefonoLaboratorio";

@Index("laboratorio_direccion_key", ["direccion"], { unique: true })
@Index("laboratorio_pkey", ["id"], { unique: true })
@Index("laboratorio_nombre_key", ["nombre"], { unique: true })
@Entity("laboratorio", { schema: "public" })
export class Laboratorio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, unique: true })
  nombre: string | null;

  @Column("character varying", {
    name: "direccion",
    nullable: true,
    unique: true,
  })
  direccion: string | null;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.laboratorios)
  @JoinColumn([{ name: "id_ciudad", referencedColumnName: "id" }])
  idCiudad: Ciudad;

  @OneToMany(
    () => MedicamentoLaboratorio,
    (medicamentoLaboratorio) => medicamentoLaboratorio.idLaboratorio
  )
  medicamentoLaboratorios: MedicamentoLaboratorio[];

  @OneToMany(
    () => TelefonoLaboratorio,
    (telefonoLaboratorio) => telefonoLaboratorio.idLaboratorio
  )
  telefonoLaboratorios: TelefonoLaboratorio[];
}
