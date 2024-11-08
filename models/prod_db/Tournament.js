const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tournament = sequelize.define(
        'Tournament',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'tournament_type',
                    key: 'id',
                },
            },
            season_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'season',
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
            full_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            short_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            date_start: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            date_end: {
                type: DataTypes.DATE,
                allowNull: false,
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
            year_of_birth: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'tournament',
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    name: 'IDX_BD5FB8D94EC001D1',
                    fields: ['season_id'],
                },
                {
                    name: 'IDX_BD5FB8D9C54C8C93',
                    fields: ['type_id'],
                },
            ],
        }
    );

    Tournament.associate = (models) => {
        Tournament.belongsTo(models.Season, {
            foreignKey: 'season_id',
            onDelete: 'CASCADE',
        });

        Tournament.belongsTo(models.TournamentType, {
            foreignKey: 'type_id',
            onDelete: 'SET NULL',
        });

        Tournament.belongsTo(models.File, {
            foreignKey: 'logo_id',
            onDelete: 'SET NULL',
        });

        Tournament.hasMany(models.Group, {
            foreignKey: 'tournament_id',
            onDelete: 'SET NULL',
        });

        Tournament.hasMany(models.Tour, {
            foreignKey: 'tournament_id',
            onDelete: 'SET NULL',
        });
    };

    return Tournament;
};
