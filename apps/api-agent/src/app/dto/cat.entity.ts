import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    timestamps: false
})
export class Cat extends Model {
    @Column({
        primaryKey: true
    })
    name: string;

    @Column
    age: number;

    @Column
    breed: string;
}
