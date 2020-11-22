import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IntegranteHogar } from "./IntegranteHogar";
import { TipoContacto } from "./TipoContacto";

@Index("contacto_emergencia_pkey", ["id"], { unique: true })
@Entity("contacto_emergencia", { schema: "public" })
export class ContactoEmergencia {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "id_paciente", nullable: true })
  idPaciente: number | null;

  @ManyToOne(
    () => IntegranteHogar,
    (integranteHogar) => integranteHogar.contactoEmergencias
  )
  @JoinColumn([
    { name: "id_integrante_hogar", referencedColumnName: "idPersona" },
  ])
  idIntegranteHogar: IntegranteHogar;

  @ManyToOne(
    () => TipoContacto,
    (tipoContacto) => tipoContacto.contactoEmergencias
  )
  @JoinColumn([{ name: "id_tipo_contacto", referencedColumnName: "id" }])
  idTipoContacto: TipoContacto;
}
