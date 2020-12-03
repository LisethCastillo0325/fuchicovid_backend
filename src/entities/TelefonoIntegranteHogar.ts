import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IntegranteHogar } from "./IntegranteHogar";
import { TipoTelefono } from "./TipoTelefono";

@Index("telefono_integrante_hogar_pkey", ["id"], { unique: true })
@Index("telefono_integrante_hogar_telefono_key", ["telefono"], { unique: true })
@Entity("telefono_integrante_hogar", { schema: "public" })
export class TelefonoIntegranteHogar {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "telefono", nullable: true, unique: true })
  telefono: number | null;

  @ManyToOne(
    () => IntegranteHogar,
    (integranteHogar) => integranteHogar.telefonoIntegranteHogars
  )
  @JoinColumn([{ name: "id_integrante", referencedColumnName: "idPersona" }])
  idIntegrante: IntegranteHogar;

  @ManyToOne(
    () => TipoTelefono,
    (tipoTelefono) => tipoTelefono.telefonoIntegranteHogars
  )
  @JoinColumn([{ name: "id_tipo_telefono", referencedColumnName: "id" }])
  idTipoTelefono: TipoTelefono;
}
