const homeRouter = require('./home');
const foodRouter = require('./food');
const authRouter = require('./auth');
const cartRouter = require('./cart');

const getUserIdMidleware = require('../midlewares/getUserIdMidleware')

function router(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/food', foodRouter);
    app.use('/api/cart', getUserIdMidleware, cartRouter);
    app.use('/', homeRouter);
}

module.exports = router;