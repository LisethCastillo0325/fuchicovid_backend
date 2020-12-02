import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { RelacionPacienteIntegrante } from "./RelacionPacienteIntegrante";
@Entity("contacto_emergencia", { schema: "public" })
@Index("contacto_emergencia_pkey", ["id"], { unique: true })

export class ContactoEmergencia {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;


  @OneToOne(
    () => RelacionPacienteIntegrante,
    (relacionPacienteIntegrante) => relacionPacienteIntegrante.contactoEmergencia
  )
  @JoinColumn([
    { name: "id_relacion_paciente_integrante", referencedColumnName: "id" },
  ])
  relacionPacienteIntegrante: RelacionPacienteIntegrante;

}
