const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Group = sequelize.define(
        'Group',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'tournament',
                    key: 'id',
                },
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
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            object_status: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            stage_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'stage',
                    key: 'id',
                },
            },
        },
        {
            tableName: 'group',
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    name: 'IDX_6DC044C52298D193',
                    fields: ['stage_id'],
                },
                {
                    name: 'IDX_6DC044C533D1A3E7',
                    fields: ['tournament_id'],
                },
            ],
        }
    );

    Group.associate = (models) => {
        Group.belongsTo(models.Tournament, {
            foreignKey: 'tournament_id',
            onDelete: 'SET NULL',
        });

        Group.belongsTo(models.Stage, {
            foreignKey: 'stage_id',
            onDelete: 'SET NULL',
        });

        Group.hasMany(models.Tour, {
            foreignKey: 'tournament_group_id',
            onDelete: 'SET NULL',
        });
    };

    return Group;
};
