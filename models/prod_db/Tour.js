const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tour = sequelize.define(
        'Tour',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tournament_group_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'group',
                    key: 'id',
                },
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            date_start: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            date_end: {
                type: DataTypes.DATE,
                allowNull: false,
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
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tournament',
                    key: 'id',
                },
            },
        },
        {
            tableName: 'tour',
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    name: 'IDX_6AD1F9691EEA3FA2',
                    fields: ['tournament_group_id'],
                },
                {
                    name: 'IDX_6AD1F96933D1A3E7',
                    fields: ['tournament_id'],
                },
            ],
        }
    );

    Tour.associate = (models) => {
        // Связь с Tournament (многие к одному)
        Tour.belongsTo(models.Tournament, {
            foreignKey: 'tournament_id',
            onDelete: 'CASCADE',
        });

        // Связь с Group (многие к одному)
        Tour.belongsTo(models.Group, {
            foreignKey: 'tournament_group_id',
            onDelete: 'SET NULL',
        });
    };

    return Tour;
};
