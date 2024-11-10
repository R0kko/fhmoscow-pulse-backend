require('dotenv').config();

module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST || 'db',
        dialect: 'postgres',
        pool: {
            max: 10, // Максимальное количество соединений в пуле для PostgreSQL
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST || 'db',
        dialect: 'postgres',
        pool: {
            max: 10,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
    },
    development_maria: {
        username: process.env.MARIA_DB_USER,
        password: process.env.MARIA_DB_PASSWORD,
        database: process.env.MARIA_DB_NAME,
        host: process.env.MARIA_DB_HOST || 'mariadb',
        dialect: 'mariadb',
        dialectOptions: {
            allowPublicKeyRetrieval: true,
        },
        pool: {
            max: 3, // Ограниченное количество соединений для MariaDB
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
    },
    production_maria: {
        username: process.env.MARIA_DB_USER,
        password: process.env.MARIA_DB_PASSWORD,
        database: process.env.MARIA_DB_NAME,
        host: process.env.MARIA_DB_HOST || 'mariadb',
        dialect: 'mariadb',
        pool: {
            max: 3,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
    },
};
