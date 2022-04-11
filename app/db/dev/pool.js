import { Pool } from 'pg';
import env from '../../../env';

const databaseConfig = { connectionString: env.database_url };
// const pool = new Pool(databaseConfig);
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Semantica',
    password: 'Soulreaver2394!@db',
    port: 5434,
});

export default pool;
