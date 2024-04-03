const { Sequelize } = require('sequelize');


module.exports = new Sequelize( process.env.POSTGRES_DBNAME, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    port: process.env.POSTGRES_PORT|| 5432,
    dialect: 'postgres',
    schema:"core",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        
    }
    
}).authenticate(console.log).then(() => {
    // console.log('Connection has been established successfully.');
 }).catch((error) => {
    // console.error('Unable to connect to the database: ', error);
 });

