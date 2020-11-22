import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Persona } from "./Persona";

@Index("usuario_pkey", ["id"], { unique: true })
@Index("usuario_login_key", ["login"], { unique: true })
@Index("usuario_password_key", ["password"], { unique: true })
@Entity("usuario", { schema: "public" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "password",
    nullable: true,
    unique: true,
  })
  password: string | null;

  @Column("character varying", { name: "login", nullable: true, unique: true })
  login: string | null;

  @ManyToOne(() => Persona, (persona) => persona.usuarios)
  @JoinColumn([{ name: "id_persona", referencedColumnName: "id" }])
  idPersona: Persona;
}
