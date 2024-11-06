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
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_status_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'UserStatus', // название модели для связи
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
            paranoid: true,
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
    };

    return User;
};
