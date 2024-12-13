const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AddressType = sequelize.define(
        'AddressType',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                comment: 'Название типа адреса',
            },
            alias: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                comment: 'Алиас типа адреса',
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
            tableName: 'address_types',
            paranoid: true, // Включает поддержку soft delete (поле deletedAt)
        }
    );

    AddressType.associate = (models) => {
        AddressType.hasMany(models.Address, {
            foreignKey: 'address_type_id',
            as: 'Addresses',
        });
    };

    return AddressType;
};
