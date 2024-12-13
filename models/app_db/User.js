const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            middle_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            birth_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            snils: {
                type: DataTypes.STRING(11),
                allowNull: true,
                unique: true,
                validate: {
                    is: /^\d{11}$/, // Проверяет, что СНИЛС состоит из 11 цифр
                },
                comment: 'СНИЛС пользователя',
            },
            inn: {
                type: DataTypes.STRING(12),
                allowNull: true,
                unique: true,
                validate: {
                    is: /^\d{10,12}$/, // ИНН может быть длиной 10 или 12 цифр
                },
                comment: 'ИНН пользователя',
            },
            phone: {
                type: DataTypes.STRING(15),
                allowNull: true,
                unique: true,
                validate: {
                    isNumeric: true, // Только цифры
                },
                comment: 'Телефон пользователя (только цифры)',
            },
            gender: {
                type: DataTypes.ENUM('MALE', 'FEMALE', 'UNDEFINED'),
                allowNull: true,
                comment: 'Пол пользователя',
            },
            user_status_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'UserStatus',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: 'users',
            paranoid: true, // Включает soft delete
            timestamps: true, // Включает поля createdAt и updatedAt
        }
    );

    // Настройка связей модели
    User.associate = (models) => {
        User.belongsTo(models.UserStatus, { foreignKey: 'user_status_id' });
        User.belongsToMany(models.Role, {
            through: models.UserRole,
            foreignKey: 'user_id',
            otherKey: 'role_id',
        });
        User.hasMany(models.ApiKey, {
            foreignKey: 'user_id',
            onDelete: 'SET NULL',
        });
        User.hasOne(models.Passport, {
            foreignKey: 'user_id',
            as: 'Passport',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        User.belongsToMany(models.Address, {
            through: models.UserAddress,
            foreignKey: 'user_id',
            as: 'Addresses',
        });
        User.hasMany(models.Name, {
            foreignKey: 'user_id',
            as: 'Names',
            onDelete: 'CASCADE',
        });
    };

    return User;
};
