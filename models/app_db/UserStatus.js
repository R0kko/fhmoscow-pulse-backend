const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'UserStatus',
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
            tableName: 'user_statuses',
            paranoid: true,
        }
    );
};
