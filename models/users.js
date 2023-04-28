module.exports = (sequelize, type) => {

    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
       
        user_name: type.STRING(60),
        email: type.STRING(50),
        password: type.STRING(200),
        
    })


}