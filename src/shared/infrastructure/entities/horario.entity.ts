import {
  BeforeSoftRemove,
  Column,
  DataSource,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Matricula } from './matricula.entity';

@Entity('turno')
export class Turno {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @OneToMany(() => Matricula, (matricula) => matricula.turno)
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

  @BeforeSoftRemove()
  async checkReferences(dataSource?: DataSource) {
    if (!dataSource) {
      throw new Error(
        'Não foi possível verificar referências antes da remoção.',
      );
    }
    const matriculaRepo = dataSource.getRepository(Matricula);
    const count = await matriculaRepo.count({
      where: { idTurno: this.id },
    });
    if (count > 0) {
      throw new Error(
        'Não é possível remover o turno porque existem matrículas ativas com este turno.',
      );
    }
  }
}
