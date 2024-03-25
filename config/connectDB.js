const { Sequelize } = require('sequelize');

if (!process.env.DATABASE_URL){
const {dbName,dbUser,dbPassword,dbHost, dbPort} = process.env
module.exports = new Sequelize(dbName,dbUser,dbPassword, {
    host: dbHost,
    port: dbPort || 5432,
    dialect: 'postgres',
    // logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        
    }
    
});
}else{
  // const Sequelize = require('sequelize');
  if(!process.env.ssl){
    module.exports  = new Sequelize(process.env.DATABASE_URL)
    
  }else{
    module.exports  = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
          ssl: {
            // require: true,
            rejectUnauthorized: false
          }
        }
      }
    );
  }

}

// Sequelize.
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


