import pool from '../db/dev/pool';
import {hashPassword} from "./validations";

pool.on('connect', () => {
  console.log('connected to the db');
});

const seedUsers = () => {
    const seedUserQuery = `INSERT INTO users 
    VALUES ( default, 'admin@admin.admin', '${hashPassword('admin@admin.admin')}', '1234AB', 'streetName', 10, 'plaatsnaam', true, NOW()),
    ( default, 'test@test.test', '${hashPassword('test@test.test')}', '1234AB', 'streetName', 10, 'plaatsnaam', false, NOW());`;

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

const seedProducts = () => {
    const seedProductsQuery = ` INSERT INTO product
    VALUES (default, 'name', 'cat', 1.2, 'brouwer', 'img', 4, 'fermentatie verwijderen?')
    `;

  pool.query(seedProductsQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
};

const seed = () => {
  // seedUsers();
  // seedProducts();
};

// pool.on('remove', () => {
//   console.log('seed');
//   console.log('client removed');
//   process.exit(0);
// });

export { seed };

require('make-runnable');
