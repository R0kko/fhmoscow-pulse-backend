const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserBankRequisite = sequelize.define(
        'UserBankRequisite',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            bank_requisite_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            account_number: {
                type: DataTypes.STRING(20),
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
            tableName: 'user_bank_requisites',
            timestamps: true,
            paranoid: true,
        }
    );

    UserBankRequisite.associate = (models) => {
        UserBankRequisite.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'User',
        });
        UserBankRequisite.belongsTo(models.BankRequisite, {
            foreignKey: 'bank_requisite_id',
            as: 'BankRequisite',
        });
    };

    return UserBankRequisite;
};
