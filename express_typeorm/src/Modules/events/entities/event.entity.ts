import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workshop } from './workshop.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    createdAt: Date;
  
    @OneToMany(() => Workshop, workshop => workshop.event)
    workshops: Workshop[];
  }
