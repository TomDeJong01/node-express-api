import pool from './pool';

pool.on('connect', () => {
  // console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {

    const userCreateQuery = `create table users (
        id  serial  not null    constraint users_pkey   primary key,
        email       varchar(100)    not null    constraint users_email_key  unique,
        password    varchar(100)    not null,
        zipcode     varchar(7)      not null,
        street      varchar(100)    not null,
        house_nr    numeric         not null,
        place       varchar(100)    not null,
        is_admin    boolean default false,
        created_on  date            not null
    );`;

  pool.query(userCreateQuery)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

const createProductTable = () => {

    const productCreateQuery = `create table product (
        id                serial       not null,
        name              varchar(255) not null,
        category          varchar(255),
        price             numeric,
        brewery           varchar(255),
        img            varchar(255),
        alcoholpercentage numeric,
        fermentation      varchar(255),
        category_id       numeric
    );`;

    pool.query(productCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createOrderTable = () => {

    const userCreateQuery = `create table "order"(
        order_id     serial  not null constraint order_pk primary key,
        user_id      integer not null,
        order_status varchar(255),
        date         date default CURRENT_DATE
    );`;

    pool.query(userCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createOrderProductTable = () => {

    const userCreateQuery = `create table order_product(
        order_id   integer,
        product_id integer,
        amount     integer
    );`;

    pool.query(userCreateQuery)
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
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createProductTable();
  createOrderTable();
  createOrderProductTable();
};

// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });


export {
  createAllTables,
};

require('make-runnable');
