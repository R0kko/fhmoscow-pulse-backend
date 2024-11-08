const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Team = sequelize.define(
        'Team',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            club_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'club',
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
                type: DataTypes.STRING(255),
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
            stadium_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'team',
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    name: 'club_index',
                    fields: ['club_id'],
                },
                {
                    name: 'objectStatus_index',
                    fields: ['object_status'],
                },
                {
                    name: 'IDX_C4E0A61F7E860E36',
                    fields: ['stadium_id'],
                },
            ],
        }
    );

    Team.associate = (models) => {
        Team.belongsTo(models.Club, {
            foreignKey: 'club_id',
            onDelete: 'CASCADE',
        });

        Team.belongsTo(models.File, {
            foreignKey: 'logo_id',
            onDelete: 'SET NULL',
        });
    };

    return Team;
};
