import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Funcionario } from "./Funcionario";
import { IntegranteHogar } from "./IntegranteHogar";
import { Paciente } from "./Paciente";
import { TipoIdentificacion } from "./TipoIdentificacion";
import { PersonaDireccion } from "./PersonaDireccion";
import { PersonaTelefonos } from "./PersonaTelefonos";
import { ProcesoRegistros } from "./ProcesoRegistros";
import { ProfesionalSalud } from "./ProfesionalSalud";
import { Usuario } from "./Usuario";

@Index("persona_pkey", ["id"], { unique: true })
@Index("persona_numero_identificacion_key", ["numeroIdentificacion"], {
  unique: true,
})
@Entity("persona", { schema: "public" })
export class Persona {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("character varying", {
    name: "numero_identificacion",
    nullable: true,
    unique: true,
    length: 10,
  })
  numeroIdentificacion: string | null;

  @OneToOne(() => Funcionario, (funcionario) => funcionario.idPersona)
  funcionario: Funcionario;

  @OneToOne(
    () => IntegranteHogar,
    (integranteHogar) => integranteHogar.idPersona2
  )
  integranteHogar: IntegranteHogar;

  @OneToOne(() => Paciente, (paciente) => paciente.idPersona2)
  paciente: Paciente;

  @ManyToOne(
    () => TipoIdentificacion,
    (tipoIdentificacion) => tipoIdentificacion.personas
  )
  @JoinColumn([{ name: "id_tipo_identificacion", referencedColumnName: "id" }])
  idTipoIdentificacion: TipoIdentificacion;

  @OneToMany(
    () => PersonaDireccion,
    (personaDireccion) => personaDireccion.idPersona
  )
  personaDireccions: PersonaDireccion[];

  @OneToMany(
    () => PersonaTelefonos,
    (personaTelefonos) => personaTelefonos.idPersona
  )
  personaTelefonos: PersonaTelefonos[];

  @OneToMany(
    () => ProcesoRegistros,
    (procesoRegistros) => procesoRegistros.idPersonaRegistrada
  )
  procesoRegistros: ProcesoRegistros[];

  @OneToMany(
    () => ProcesoRegistros,
    (procesoRegistros) => procesoRegistros.idPersonaRegistrador
  )
  procesoRegistros2: ProcesoRegistros[];

  @OneToOne(
    () => ProfesionalSalud,
    (profesionalSalud) => profesionalSalud.idPersona2
  )
  profesionalSalud: ProfesionalSalud;

  @OneToMany(() => Usuario, (usuario) => usuario.idPersona)
  usuarios: Usuario[];
}
