import { Sequelize } from 'sequelize-typescript';
import {Cat} from "../dto/node.entity";

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
            sequelize.addModels([Cat]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
