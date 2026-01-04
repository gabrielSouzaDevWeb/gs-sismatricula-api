import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estudante } from './estudante.entity';
import { Matricula } from './matricula.entity';

@Entity('filiacoes')
export class Filiacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rg: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  cpf: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  estadoCivil: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  enderecoRes: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  numeroEndereco: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bairro: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cep: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  complemento: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefoneResidencial: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  celular: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profissao: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nomeEnderecoComercial: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefoneComercial: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefoneComercial2: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  outroTelefones: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @ManyToOne(() => Estudante, (estudante) => estudante.filiacoes)
  @JoinColumn({ name: 'idEstudante' })
  estudante: Estudante;

  @Column({ type: 'uuid' })
  idEstudante: string;

  @OneToMany(() => Matricula, (matricula) => matricula.responsavelPagamento)
  matriculasResponsavelPagamento: Matricula[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dtCriacao: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  dtAtualizacao: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'dtDeletado', nullable: true })
  dtDeletado: Date | null;
}
