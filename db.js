const Sequelize = require ('sequelize');
const UserModel = require('./models/users');
const SaleModel = require('./models/sales');


const sequelize = new  Sequelize('datacenter', 'root', '' , {
    host: 'localhost',
    dialect: 'mysql'
});


const User = UserModel(sequelize, Sequelize);
const Sale = SaleModel(sequelize, Sequelize);


sequelize.sync({ force: false })
.then(() => {
    console.log('Tablas Sincronizadas')
})

module.exports = {   
    User,
    Sale
}