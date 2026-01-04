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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Estudante, (estudante) => estudante.matriculas)
  @JoinColumn({ name: 'idEstudante' })
  estudante: Estudante;

  @Column({ type: 'uuid' })
  idEstudante: string;

  @Column({ type: 'varchar', length: 10 })
  anoLetivo: string;

  @ManyToOne(() => Turno, (horario) => horario.matriculas, { nullable: true })
  @JoinColumn({ name: 'idHorario' })
  horario: Turno;

  @Column({ type: 'uuid', nullable: true })
  idHorario: string;

  @ManyToOne(
    () => Filiacao,
    (filiacao: Filiacao) => filiacao.matriculasResponsavelPagamento,
    { nullable: true },
  )
  @JoinColumn({ name: 'idResponsavelPagamento' })
  responsavelPagamento: Filiacao;

  @Column({ type: 'uuid', nullable: true })
  idResponsavelPagamento: string;

  @Column({ type: 'varchar', length: 50, default: 'ativa' })
  status: string; // ativa, cancelada, concluida

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorMensalidade: number;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

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
