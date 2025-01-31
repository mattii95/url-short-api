import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'shortens'})
export class Shorten {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @Column('text', {
        unique: true,
    })
    shortCode: string;

    @Column('int', {
        default: 0
    })
    accessCount: number;

    @Column('timestamp', {
        default: new Date()
    })
    createdAt: Date;
    
    @Column('timestamp', {
        nullable: true
    })
    updatedAt: Date;
}
