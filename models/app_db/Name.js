const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Name = sequelize.define(
        'Name',
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
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name_type_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'name_types',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: 'ФИО в соответствующем падеже',
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
            tableName: 'names',
            paranoid: true,
            timestamps: true,
        }
    );

    // Настройка связей
    Name.associate = (models) => {
        Name.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'User',
        });
        Name.belongsTo(models.NameType, {
            foreignKey: 'name_type_id',
            as: 'NameType',
        });
    };

    return Name;
};
