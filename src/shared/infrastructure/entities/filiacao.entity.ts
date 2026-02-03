import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstudanteFiliacao } from './estudante-filiacao.entity';
import { Matricula } from './matricula.entity';

@Entity('filiacoes')
export class Filiacao {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'date', nullable: true, name: 'data_nascimento' })
  dataNascimento?: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rg?: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  cpf?: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'estado_civil' })
  estadoCivil?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'endereco_res',
  })
  enderecoRes?: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    name: 'numero_endereco',
  })
  numeroEndereco?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bairro?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cep?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  complemento?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    name: 'telefone_residencial',
  })
  telefoneResidencial?: string;

  @Column({ type: 'varchar', length: 20 })
  celular?: string | undefined;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profissao?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'nome_endereco_comercial',
  })
  nomeEnderecoComercial?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    name: 'telefone_comercial',
  })
  telefoneComercial?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    name: 'telefone_comercial2',
  })
  telefoneComercial2?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    name: 'outro_telefones',
  })
  outroTelefones?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @OneToMany(
    () => EstudanteFiliacao,
    (estudanteFiliacao) => estudanteFiliacao.filiacao,
  )
  estudantesFiliacoes: EstudanteFiliacao[];

  @OneToMany(() => Matricula, (matricula) => matricula.responsavelPagamento)
  matriculasResponsavelPagamento: Matricula[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'dt_criacao',
  })
  dtCriacao: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'dt_atualizacao',
  })
  dtAtualizacao: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'dt_deletado', nullable: true })
  dtDeletado: Date | null;
}
