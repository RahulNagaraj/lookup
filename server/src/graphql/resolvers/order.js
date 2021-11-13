export default {
    Query: {
        orders: async (parent, args, { models }) => {
            return await models.Order.findAll();
        },
        order: async (parent, { id }, { models }) => {
            return await models.Order.findById(id);
        },
        viewOrderByUserId: async (parent, { userId }, { models }) => {
            return await models.Order.viewOrderByUserId(userId);
        },
    },

    Mutation: {
        createOrder: async (
            parent,
            {
                businessId,
                businessName,
                serviceType,
                orderDate,
                serviceDate,
                userId,
                customerName,
                email,
                phone,
                address,
            },
            { models }
        ) => {
            const order = await models.Order.create({
                businessId,
                businessName,
                serviceType,
                orderDate,
                serviceDate,
                userId,
                customerName,
                email,
                phone,
                address,
            });

            const { id } = order;

            return {
                id,
                businessId,
                businessName,
                serviceType,
                orderDate,
                serviceDate,
                userId,
                customerName,
                email,
                phone,
                address,
            };
        },
    },
};
