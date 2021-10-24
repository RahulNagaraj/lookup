import Sequelize from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres'
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Successfully connected to Postgres!');
    })
    .catch((err) => {
        console.log('Error authenticating with Postgres: ', err);
        return;
    });

const models = {
    User: sequelize.import('./user'),
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;