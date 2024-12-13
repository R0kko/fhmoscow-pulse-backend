const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BankRequisite = sequelize.define(
        'BankRequisite',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            bic: {
                type: DataTypes.STRING(9),
                allowNull: false,
            },
            swift: {
                type: DataTypes.STRING(11),
                allowNull: true,
            },
            inn: {
                type: DataTypes.STRING(12),
                allowNull: true,
            },
            kpp: {
                type: DataTypes.STRING(9),
                allowNull: true,
            },
            registration_number: {
                type: DataTypes.STRING(9),
                allowNull: true,
            },
            correspondent_account: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            bank_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            payment_city: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            bank_address: {
                type: DataTypes.STRING(255),
                allowNull: true,
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
            tableName: 'bank_requisites',
            paranoid: true,
            timestamps: true,
        }
    );

    BankRequisite.associate = (models) => {
        BankRequisite.hasMany(models.UserBankRequisite, {
            foreignKey: 'bank_requisite_id',
            as: 'UserBankRequisites',
        });
    };

    return BankRequisite;
};
