const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TournamentType = sequelize.define(
        'TournamentType',
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
                allowNull: false,
            },
            short_name: {
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
                unique: true, // Уникальный индекс на поле logo_id
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT('long'), // Тип данных longtext
                allowNull: true,
            },
            double_protocol: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            tableName: 'tournament_type',
            timestamps: false,
            underscored: true,
        }
    );

    TournamentType.associate = (models) => {
        TournamentType.belongsTo(models.File, {
            foreignKey: 'logo_id',
            constraints: true,
            onDelete: 'SET NULL',
        });
        TournamentType.hasMany(models.Tournament, {
            foreignKey: 'type_id',
            onDelete: 'SET NULL',
        });
    };

    return TournamentType;
};
