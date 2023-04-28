const router = require('express').Router();

const middlewares = require('./middlewares');
const apiUsersRouter = require('./api/users');
const apiSalesRouter = require('./api/sales');



router.use('/users',apiUsersRouter);
router.use('/sales',middlewares.checkToken,apiSalesRouter);



module.exports = router;