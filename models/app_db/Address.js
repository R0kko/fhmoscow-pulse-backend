const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Address = sequelize.define(
        'Address',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            address_type_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'AddressType',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            result: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            postal_code: {
                type: DataTypes.STRING(6),
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
            country_iso_code: {
                type: DataTypes.STRING(2),
                allowNull: true,
            },
            federal_district: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            region_fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            region_kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            region_iso_code: {
                type: DataTypes.STRING(6),
                allowNull: true,
            },
            region_with_type: {
                type: DataTypes.STRING(131),
                allowNull: true,
            },
            region_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            region_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            region: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
            area_fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            area_kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            area_with_type: {
                type: DataTypes.STRING(131),
                allowNull: true,
            },
            area_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            area_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            area: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
            city_fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            city_kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            city_with_type: {
                type: DataTypes.STRING(131),
                allowNull: true,
            },
            city_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            city_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
            city_area: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
            city_district_fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            city_district_kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            city_district_with_type: {
                type: DataTypes.STRING(131),
                allowNull: true,
            },
            city_district_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            city_district_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            city_district: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
            settlement_fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            settlement_kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            settlement_with_type: {
                type: DataTypes.STRING(131),
                allowNull: true,
            },
            settlement_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            settlement_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            settlement: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
            street_fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            street_kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            street_with_type: {
                type: DataTypes.STRING(131),
                allowNull: true,
            },
            street_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            street_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            street: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
            stead_fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            stead_kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            stead_cadnum: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            stead_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            stead_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            stead: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            house_fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            house_kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            house_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            house_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            house: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            block: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            block_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            block_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            flat: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            flat_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            flat_type_full: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            flat_area: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            square_meter_price: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            flat_price: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            geo_lat: {
                type: DataTypes.STRING(12),
                allowNull: true,
            },
            geo_lon: {
                type: DataTypes.STRING(12),
                allowNull: true,
            },
            fias_id: {
                type: DataTypes.STRING(36),
                allowNull: true,
            },
            fias_code: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            fias_level: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            kladr_id: {
                type: DataTypes.STRING(19),
                allowNull: true,
            },
            okato: {
                type: DataTypes.STRING(11),
                allowNull: true,
            },
            oktmo: {
                type: DataTypes.STRING(11),
                allowNull: true,
            },
            tax_office: {
                type: DataTypes.STRING(4),
                allowNull: true,
            },
            tax_office_legal: {
                type: DataTypes.STRING(4),
                allowNull: true,
            },
            timezone: {
                type: DataTypes.STRING(50),
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
            tableName: 'addresses',
            paranoid: true,
        }
    );

    Address.associate = (models) => {
        Address.belongsTo(models.AddressType, {
            foreignKey: 'address_type_id',
            as: 'AddressType',
        });
        Address.belongsToMany(models.User, {
            through: models.UserAddress,
            foreignKey: 'address_id',
            as: 'User',
        });
    };

    return Address;
};
