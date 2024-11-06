'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '../../config/config.js'))[env];
const app_db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

// Чтение и подключение всех файлов моделей из текущей директории
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        app_db[model.name] = model;
    });

// Установка ассоциаций для каждой модели
Object.keys(app_db).forEach((modelName) => {
    if (app_db[modelName].associate) {
        app_db[modelName].associate(app_db);
    }
});

app_db.sequelize = sequelize;
app_db.Sequelize = Sequelize;

module.exports = app_db;
