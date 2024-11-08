const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TournamentTable = sequelize.define(
        'TournamentTable',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            season_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tournament_group_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tour_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            game_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            win_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tie_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            loss_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            win_percent: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            tie_percent: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            loss_percent: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            pucks_scored: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            pucks_scored_avg: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            pucks_missed: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            pucks_missed_avg: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            pucks_difference: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            team_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'tournament_table',
            timestamps: false,
            underscored: true,
        }
    );

    TournamentTable.associate = (models) => {
        TournamentTable.belongsTo(models.Season, {
            foreignKey: 'season_id',
            onDelete: 'CASCADE',
        });

        TournamentTable.belongsTo(models.Tournament, {
            foreignKey: 'tournament_id',
            onDelete: 'CASCADE',
        });

        TournamentTable.belongsTo(models.Group, {
            foreignKey: 'tournament_group_id',
            onDelete: 'CASCADE',
        });

        TournamentTable.belongsTo(models.Tour, {
            foreignKey: 'tour_id',
            onDelete: 'CASCADE',
        });

        TournamentTable.belongsTo(models.Team, {
            foreignKey: 'team_id',
            onDelete: 'CASCADE',
        });
    };

    return TournamentTable;
};
