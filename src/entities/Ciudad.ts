import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Departamento } from "./Departamento";
import { Laboratorio } from "./Laboratorio";
import { Paciente } from "./Paciente";

@Index("ciudad_pkey", ["id"], { unique: true })
@Index("ciudad_nombre_key", ["nombre"], { unique: true })
@Entity("ciudad", { schema: "public" })
export class Ciudad {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, unique: true })
  nombre: string | null;

  @ManyToOne(() => Departamento, (departamento) => departamento.ciudads)
  @JoinColumn([{ name: "id_departamento", referencedColumnName: "id" }])
  idDepartamento: Departamento;

  @OneToMany(() => Laboratorio, (laboratorio) => laboratorio.idCiudad)
  laboratorios: Laboratorio[];

  @OneToMany(() => Paciente, (paciente) => paciente.idCiudadContagio)
  pacientes: Paciente[];
}
