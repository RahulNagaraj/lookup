import Order from "./order";

const customer = (sequelize, DataTypes) => {
    const Customer = sequelize.define("customer", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [10],
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    // Customer.associate = function (models) {
    //     Customer.belongsTo(models.Order);
    // };

    return Customer;
};

export default customer;
