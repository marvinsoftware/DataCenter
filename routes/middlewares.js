const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    if(!req.headers['user-token']) {
        return res.status(403).json({ error: 'Need incluir el user-token en la cabecera'});

    }

    const userToken = req.headers['user-token'];
    let payload = {};
    try {
        payload = jwt.decode(userToken, 'frase secreta');
    } catch (err) {
        return res.status(403).json({ error: 'El token es incorrecto'});
    }

    if (payload.expiredAt < moment().unix()){
        return res.status(400).json({error: 'El token ha expirado'});
    }

    req.usuarioId = payload.usuarioId; 
    next();
}

module.exports = {
    checkToken: checkToken
}