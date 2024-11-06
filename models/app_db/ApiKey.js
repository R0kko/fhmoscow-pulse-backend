const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ApiKey = sequelize.define(
        'ApiKey',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            active_from: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            active_to: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'User', // название модели, на которую ссылается внешний ключ
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
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
            tableName: 'api_keys',
            paranoid: true, // включает мягкое удаление
        }
    );

    // Настройка ассоциаций
    ApiKey.associate = (models) => {
        ApiKey.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return ApiKey;
};
