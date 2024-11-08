require('dotenv').config();

module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: 'db',
        dialect: 'postgres',
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: 'db',
        dialect: 'postgres',
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
    },
    production_maria: {
        username: process.env.MARIA_DB_USER,
        password: process.env.MARIA_DB_PASSWORD,
        database: process.env.MARIA_DB_NAME,
        host: process.env.MARIA_DB_HOST || 'mariadb',
        dialect: 'mariadb',
    },
};
