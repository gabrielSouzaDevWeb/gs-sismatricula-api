import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Matricula } from './matricula.entity';

@Entity('mensalidades')
export class Mensalidade {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Matricula, (matricula) => matricula.mensalidades, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_matricula' })
  matricula: Matricula;

  @Column({ type: 'int', name: 'id_matricula' })
  idMatricula: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'valor_mensalidade',
  })
  valorMensalidade: number;

  @Column({ type: 'text', nullable: true, name: 'observacao' })
  observacao?: string;

  @Column({ type: 'int', name: 'mes_mensalidade' })
  mesMensalidade: number;

  @Column({ type: 'date', name: 'data_vencimento' })
  dataVencimento: Date | string;

  @Column({ type: 'int', name: 'ano_letivo' })
  anoLetivo: number;

  @Column({ type: 'timestamp', nullable: true, name: 'data_pagamento' })
  dataPagamento?: Date | null;

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
