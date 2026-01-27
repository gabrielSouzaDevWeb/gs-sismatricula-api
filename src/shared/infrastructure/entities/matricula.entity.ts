import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estudante } from './estudante.entity';
import { Filiacao } from './filiacao.entity';
import { Turno } from './horario.entity';

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

  @Column({ type: 'varchar', length: 50, default: 'ativa' })
  status?: string; // ativa, cancelada, concluida

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'valor_mensalidade',
  })
  valorMensalidade: number;

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
