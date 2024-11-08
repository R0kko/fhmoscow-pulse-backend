const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Season = sequelize.define(
        'Season',
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
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            object_status: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            current: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            tableName: 'season',
            timestamps: false, // Устанавливаем false, так как используются поля date_create и date_update
            underscored: true,
        }
    );

    // Определите любые ассоциации, если они необходимы
    Season.associate = (models) => {
        Season.hasMany(models.Tournament, {
            foreignKey: 'season_id',
            onDelete: 'CASCADE',
        });
    };

    return Season;
};
