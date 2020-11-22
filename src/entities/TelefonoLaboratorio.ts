import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Laboratorio } from "./Laboratorio";
import { TipoTelefono } from "./TipoTelefono";

@Index("telefono_laboratorio_pkey", ["id"], { unique: true })
@Index("telefono_laboratorio_telefono_key", ["telefono"], { unique: true })
@Entity("telefono_laboratorio", { schema: "public" })
export class TelefonoLaboratorio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "telefono", nullable: true, unique: true })
  telefono: number | null;

  @ManyToOne(
    () => Laboratorio,
    (laboratorio) => laboratorio.telefonoLaboratorios
  )
  @JoinColumn([{ name: "id_laboratorio", referencedColumnName: "id" }])
  idLaboratorio: Laboratorio;

  @ManyToOne(
    () => TipoTelefono,
    (tipoTelefono) => tipoTelefono.telefonoLaboratorios
  )
  @JoinColumn([{ name: "id_tipo_telefono", referencedColumnName: "id" }])
  idTipoTelefono: TipoTelefono;
}
