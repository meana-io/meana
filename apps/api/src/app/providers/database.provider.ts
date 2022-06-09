import { Sequelize } from 'sequelize-typescript';
import {Node} from "../domains/nodes/entities/node.entity"

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
            sequelize.addModels([Node]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
