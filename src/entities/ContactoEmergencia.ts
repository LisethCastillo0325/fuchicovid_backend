import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IntegranteHogar } from "./IntegranteHogar";
import { Paciente } from "./Paciente";
import { TipoContacto } from "./TipoContacto";

@Index("contacto_emergencia_pkey", ["id"], { unique: true })
@Entity("contacto_emergencia", { schema: "public" })
export class ContactoEmergencia {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(
    () => IntegranteHogar,
    (integranteHogar) => integranteHogar.contactoEmergencias
  )
  @JoinColumn([
    { name: "id_integrante_hogar", referencedColumnName: "idPersona" },
  ])
  idIntegranteHogar: IntegranteHogar;

  @ManyToOne(() => Paciente, (paciente) => paciente.contactoEmergencias)
  @JoinColumn([{ name: "id_paciente", referencedColumnName: "idPersona" }])
  idPaciente: Paciente;

  @ManyToOne(
    () => TipoContacto,
    (tipoContacto) => tipoContacto.contactoEmergencias
  )
  @JoinColumn([{ name: "id_tipo_contacto", referencedColumnName: "id" }])
  idTipoContacto: TipoContacto;
}
