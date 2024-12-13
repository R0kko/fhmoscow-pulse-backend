const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserAddress = sequelize.define(
        'UserAddress',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            address_id: {
                type: DataTypes.UUID,
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
            assign_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            tableName: 'user_addresses',
            timestamps: true,
            paranoid: true,
        }
    );

    UserAddress.associate = (models) => {
        UserAddress.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'User',
        });
        UserAddress.belongsTo(models.Address, {
            foreignKey: 'address_id',
            as: 'Address',
        });
    };

    return UserAddress;
};
