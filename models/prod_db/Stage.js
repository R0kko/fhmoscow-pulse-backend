const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Stage = sequelize.define(
        'Stage',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tournament',
                    key: 'id',
                },
            },
            name: {
                type: DataTypes.STRING(255),
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
            play_off: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            current: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            tableName: 'stage',
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    name: 'IDX_C27C936933D1A3E7',
                    fields: ['tournament_id'],
                },
            ],
        }
    );

    Stage.associate = (models) => {
        Stage.belongsTo(models.Tournament, {
            foreignKey: 'tournament_id',
            onDelete: 'CASCADE',
        });

        Stage.hasMany(models.Group, {
            foreignKey: 'stage_id',
            onDelete: 'SET NULL',
        });
    };

    return Stage;
};
