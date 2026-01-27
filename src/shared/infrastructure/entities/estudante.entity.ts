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

  @Column({ type: 'date', nullable: true, name: 'data_nascimento' })
  dataNascimento: Date | string;

  @Column({ type: 'varchar', length: 1 })
  sexo: string; //M|F

  @Column({ type: 'varchar', length: 100, nullable: true })
  serie: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  escola: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    name: 'numero_contato',
  })
  numeroContato: string;

  @Column({ type: 'text', nullable: true, name: 'alergico_medicamento' })
  alergicoMedicamento: string;

  @Column({ type: 'text', nullable: true, name: 'alergia_alimento' })
  alergiaAlimento: string;

  @Column({ type: 'text', nullable: true, name: 'tratamento_medico' })
  tratamentoMedico: string;

  @Column({ type: 'text', nullable: true, name: 'medicacao_especifica' })
  medicacaoEspecifica: string;

  @OneToMany(() => Filiacao, (filiacao) => filiacao.estudante)
  filiacoes: Filiacao[];

  @OneToMany(() => Matricula, (matricula) => matricula.estudante)
  matriculas: Matricula[];

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
