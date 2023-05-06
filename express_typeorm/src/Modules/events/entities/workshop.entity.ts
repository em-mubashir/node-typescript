import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Workshop {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    start: Date;
  
    @Column()
    end: Date;
  
    @Column()
    name: string;
  
    @ManyToOne(() => Event, event => event.workshops)
    event: Event;
  
    @Column()
    createdAt: Date;
  }
