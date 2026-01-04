import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Matricula } from './matricula.entity';

@Entity('horarios')
export class Turno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  turno: string; // manha, tarde, noite, integral

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFim: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  descricao: string;

  @Column({ type: 'varchar', length: 50, default: 'reforco' })
  tipoAula: string; // reforco, regular, extra

  @OneToMany(() => Matricula, (matricula) => matricula.horario)
  matriculas: Matricula[];

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
