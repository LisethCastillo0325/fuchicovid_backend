import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IntegranteHogar } from "./IntegranteHogar";

@Index("correo_integrante_hogar_correo_key", ["correo"], { unique: true })
@Index("correo_integrante_hogar_pkey", ["id"], { unique: true })
@Entity("correo_integrante_hogar", { schema: "public" })
export class CorreoIntegranteHogar {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "correo", nullable: true, unique: true })
  correo: string | null;

  @ManyToOne(
    () => IntegranteHogar,
    (integranteHogar) => integranteHogar.correoIntegranteHogars
  )
  @JoinColumn([
    { name: "id_integrante_hogar", referencedColumnName: "idPersona" },
  ])
  idIntegranteHogar: IntegranteHogar;
}
