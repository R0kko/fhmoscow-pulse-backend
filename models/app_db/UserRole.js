const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserRole = sequelize.define(
        'UserRole',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            role_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Role', // Название модели для связи
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
            tableName: 'user_roles',
            paranoid: true,
        }
    );

    UserRole.associate = (models) => {
        UserRole.belongsTo(models.User, { foreignKey: 'user_id' });
        UserRole.belongsTo(models.Role, { foreignKey: 'role_id' });
    };

    return UserRole;
};
