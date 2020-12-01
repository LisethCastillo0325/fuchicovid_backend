import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { IntegranteHogar } from "./IntegranteHogar";
import { TipoContacto } from "./TipoContacto";
import { Paciente } from "./Paciente";
import {ContactoEmergencia} from "./ContactoEmergencia";

@Entity("relacion_paciente_integrante", { schema: "public" })
@Index("relacion_paciente_integrante_pkey", ["id"], { unique: true })

export class RelacionPacienteIntegrante {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(
    () => IntegranteHogar,
    (integranteHogar) => integranteHogar.relacionPacienteIntegrantes
  )
  @JoinColumn([{ name: "id_integrante", referencedColumnName: "idPersona" }])
  idIntegrante: IntegranteHogar;

  @ManyToOne(
    () => TipoContacto,
    (tipoContacto) => tipoContacto.relacionPacienteIntegrantes
  )
  @JoinColumn([{ name: "id_tipo_contacto", referencedColumnName: "id" }])
  idTipoContacto: TipoContacto;

  @OneToOne(
    () => ContactoEmergencia,
    (contactoEmergencia) => contactoEmergencia.relacionPacienteIntegrante
  )
  contactoEmergencia:ContactoEmergencia
  @ManyToOne(() => Paciente, (paciente) => paciente.relacionPacienteIntegrantes)
  @JoinColumn([{ name: "id_paciente", referencedColumnName: "idPersona" }])
  idPaciente: Paciente;
}
