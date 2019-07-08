import Router from 'express-promise-router';
import accessGuard from '../helpers/accessGuard';
import { getAllUsers, getUserByPk } from '../controllers/userController';

import cartRouter from './cartRouter';
import ordersRouter from './ordersRouter';

const userRouter = Router();

// Routes

userRouter.route('/').get(accessGuard(false, 'Moderator'), getAllUsers);

userRouter.route('/:userId').get(accessGuard(true, 'Moderator'), getUserByPk);

userRouter.use(
	'/:userId/cart',
	(req, res, next) => {
		res.locals.userId = req.params.userId;
		return next();
	},
	accessGuard(true, 'Service worker'),
	cartRouter
);

userRouter.use(
	'/:userId/orders',
	(req, res, next) => {
		res.locals.userId = req.params.userId;
		return next();
	},
	ordersRouter
);

// Export
export default userRouter;
