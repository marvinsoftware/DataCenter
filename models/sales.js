module.exports = (sequelize, type) => {

    return sequelize.define('sale', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        operador: type.STRING(15),
        valor: type.INTEGER,
    })


}