const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserPassport = sequelize.define(
        'Passport',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            country_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'Country',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            series: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            issue_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            issuing_authority: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            department_code: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            place_of_birth: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: 'passports',
            paranoid: true,
        }
    );

    UserPassport.associate = (models) => {
        UserPassport.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'User',
        });
        UserPassport.belongsTo(models.Country, {
            foreignKey: 'country_id',
            as: 'Country',
        });
    };

    return UserPassport;
};
