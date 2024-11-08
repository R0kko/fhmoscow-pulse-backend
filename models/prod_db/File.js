const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const File = sequelize.define(
        'File',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            module: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            mime_type: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            date_create: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            date_update: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            object_status: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: 'file',
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    name: 'module_index',
                    fields: ['module'],
                },
                {
                    name: 'objectStatus_index',
                    fields: ['object_status'],
                },
            ],
        }
    );

    File.associate = (models) => {
        File.hasOne(models.Tournament, {
            foreignKey: 'logo_id',
            onDelete: 'SET NULL',
        });
    };
    return File;
};
