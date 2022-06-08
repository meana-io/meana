import { Sequelize } from 'sequelize-typescript';
import {NodeDisk} from "../domains/node-disks/entities/node-disk.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'password',
                database: 'meana',
            });
            sequelize.addModels([NodeDisk]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
