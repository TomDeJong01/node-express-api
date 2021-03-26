import pool from '../db/dev/pool';
import {hashPassword} from "./validations";

pool.on('connect', () => {
  console.log('connected to the db');
});


/**
 * SEED User
 */
const seed = () => {
  const seedUserQuery = `INSERT INTO users VALUES ( default, 'test@test.test', 'test@test.test', '${hashPassword('test@test.test')}', '1234AB', 'streetName', 10, 'plaatsnaam', false, NOW());`;

  pool.query(seedUserQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Seed users
 */
const seedUser = () => {
  seed();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export { seedUser };

require('make-runnable');
