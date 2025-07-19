import { Gravestone } from '../gravestones/gravestone.entity';
import { City } from '../cities/city.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('cemeteries')
export class Cemetery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => City, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @OneToMany(() => Gravestone, gravestone => gravestone.cemetery)
  gravestones: Gravestone[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}