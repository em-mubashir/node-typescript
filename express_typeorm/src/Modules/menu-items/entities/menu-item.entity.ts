import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column({ type: 'integer', default: null })
    parentId: number;

    @Column({ type: 'datetime' })
    createdAt: string;

    @ManyToOne(type => MenuItem, menuItem => menuItem.children)
    @JoinColumn({ name: 'parentId' })
    parent: MenuItem;

    @OneToMany(type => MenuItem, menuItem => menuItem.parent)
    children: MenuItem[];
}
