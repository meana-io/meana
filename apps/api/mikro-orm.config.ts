import {User} from "./src/app/Entities/User";

export default {
    entities: [User],
    dbName: 'meana',
    user: 'postgres',
    password: '',
    port: 5432,
    host: 'localhost',
    type: 'postgresql'
};
