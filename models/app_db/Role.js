const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define(
        'Role',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            alias: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
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
            tableName: 'roles',
            paranoid: true,
        }
    );

    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
            through: models.UserRole,
            foreignKey: 'role_id',
            otherKey: 'user_id',
        });
    };

    return Role;
};
