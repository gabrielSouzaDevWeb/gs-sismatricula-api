import { StatusMatricula } from 'src/shared/enum/status-matricula.enum';
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
import { Filiacao } from './filiacao.entity';
import { Turno } from './horario.entity';
import { Mensalidade } from './mensalidade.entity';

@Entity('matriculas')
export class Matricula {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Estudante, (estudante) => estudante.matriculas)
  @JoinColumn({ name: 'id_estudante' })
  estudante: Estudante;

  @Column({ type: 'int', name: 'id_estudante' })
  idEstudante: number;

  @Column({ type: 'int', name: 'ano_letivo' })
  anoLetivo: number;

  @ManyToOne(() => Turno, (turno) => turno.matriculas, { nullable: true })
  @JoinColumn({ name: 'id_turno' })
  turno: Turno;

  @Column({ type: 'int', nullable: true, name: 'id_turno' })
  idTurno: number;

  @ManyToOne(
    () => Filiacao,
    (filiacao: Filiacao) => filiacao.matriculasResponsavelPagamento,
    { nullable: true },
  )
  @JoinColumn({ name: 'id_responsavel_pagamento' })
  responsavelPagamento: Filiacao;

  @Column({ type: 'int', nullable: true, name: 'id_responsavel_pagamento' })
  idResponsavelPagamento: number;

  @OneToMany(() => Mensalidade, (mensalidade) => mensalidade.matricula)
  mensalidades: Mensalidade[];

  @Column({ type: 'int', default: StatusMatricula.ATIVA })
  status: StatusMatricula;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'valor_matricula',
    nullable: true,
  })
  valorMatricula: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'valor_mensalidade',
  })
  valorMensalidade: number;

  @Column({ type: 'int', name: 'quantidade_mensalidades', nullable: true })
  quantidadeMensalidades: number;

  @Column({ type: 'int', name: 'dia_vencimento', nullable: true })
  diaVencimento: number;

  @Column({ type: 'int', name: 'mes_inicio_mensalidade', nullable: true })
  mesInicioMensalidade: number;

  @Column({ type: 'int', name: 'mes_fim_mensalidade', nullable: true })
  mesFimMensalidade: number;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

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
