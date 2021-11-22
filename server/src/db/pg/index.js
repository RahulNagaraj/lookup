import Sequelize from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: true,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Successfully connected to Postgres!");
    })
    .catch((err) => {
        console.log("Error authenticating with Postgres: ", err);
        return;
    });

const models = {
    User: sequelize.import("./models/user"),
    Customer: sequelize.import("./models/customer"),
    Order: sequelize.import("./models/order"),
    SearchLog: sequelize.import("./models/search_log.js"),
};

Object.keys(models).forEach((key) => {
    if ("associate" in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;
