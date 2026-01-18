import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Filiacao } from './filiacao.entity';
import { Matricula } from './matricula.entity';

@Entity('estudantes')
export class Estudante {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'date' })
  dataNascimento: Date | string;

  @Column({ type: 'varchar', length: 1 })
  sexo: string; //M|F

  @Column({ type: 'varchar', length: 100 })
  serie: string;

  @Column({ type: 'varchar', length: 255 })
  escola: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  numeroContato: string;

  @Column({ type: 'text', nullable: true })
  alergicoMedicamento: string;

  @Column({ type: 'text', nullable: true })
  alergiaAlimento: string;

  @Column({ type: 'text', nullable: true })
  tratamentoMedico: string;

  @Column({ type: 'text', nullable: true })
  medicacaoEspecifica: string;

  @OneToMany(() => Filiacao, (filiacao) => filiacao.estudante)
  filiacoes: Filiacao[];

  @OneToMany(() => Matricula, (matricula) => matricula.estudante)
  matriculas: Matricula[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dtCriacao: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  dtAtualizaca: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'dtDeletado', nullable: true })
  dtDeletado: Date | null;
}
