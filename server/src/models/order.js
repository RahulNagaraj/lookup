const order = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
        businessId: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
        businessName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
        serviceType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        serviceDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        customerName: {
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
    });

    Order.viewOrderByUserId = async (userId) => {
        let orders = await Order.find({
            where: { userId },
        });

        return orders;
    };

    Order.associate = function (models) {
        Order.belongsTo(models.User);
    };

    return Order;
};

export default order;
