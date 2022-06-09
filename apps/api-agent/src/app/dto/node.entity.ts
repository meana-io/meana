import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Node extends Model {
    @Column
    name: string;
}
