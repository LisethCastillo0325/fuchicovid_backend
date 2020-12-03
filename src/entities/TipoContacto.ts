import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContactoEmergencia } from "./ContactoEmergencia";

@Index("tipo_contacto_pkey", ["id"], { unique: true })
@Entity("tipo_contacto", { schema: "public" })
export class TipoContacto {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "tipo_contacto", nullable: true })
  tipoContacto: string | null;

  @OneToMany(
    () => ContactoEmergencia,
    (contactoEmergencia) => contactoEmergencia.idTipoContacto
  )
  contactoEmergencias: ContactoEmergencia[];
}
