const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'NameType',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: 'Название типа склонения',
            },
            alias: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                comment: 'Алиас типа склонения (например, GENITIVE)',
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
            tableName: 'name_types',
            paranoid: true,
            timestamps: true,
        }
    );
};
