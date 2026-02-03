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

@Entity('estudantes_filiacoes')
export class EstudanteFiliacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Estudante, (estudante) => estudante.estudantesFiliacoes)
  @JoinColumn({ name: 'id_estudante' })
  estudante: Estudante;

  @Column({ type: 'int', name: 'id_estudante' })
  idEstudante: number;

  @ManyToOne(() => Filiacao, (filiacao) => filiacao.estudantesFiliacoes)
  @JoinColumn({ name: 'id_filiacao' })
  filiacao: Filiacao;

  @Column({ type: 'int', name: 'id_filiacao' })
  idFiliacao: number;

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
