import { Cemetery } from '../cementeries/cemetery.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('gravestones')
export class Gravestone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  url: string;

  @Column({ type: 'timestamp' })
  dateOfDeath: Date;

  @ManyToOne(() => Cemetery, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cemetery_id' })
  cemetery: Cemetery;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
