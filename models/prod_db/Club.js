const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Club = sequelize.define(
        'Club',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
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
            full_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            short_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            site: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            object_status: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            logo_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: true,
                references: {
                    model: 'file',
                    key: 'id',
                },
            },
        },
        {
            tableName: 'club',
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    name: 'objectStatus_index',
                    fields: ['object_status'],
                },
            ],
        }
    );

    Club.associate = (models) => {
        Club.belongsTo(models.File, {
            foreignKey: 'logo_id',
            onDelete: 'SET NULL',
        });

        Club.hasMany(models.Team, {
            foreignKey: 'club_id',
            onDelete: 'CASCADE',
        });
    };

    return Club;
};
