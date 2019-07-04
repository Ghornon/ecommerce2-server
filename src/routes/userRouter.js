import Router from 'express-promise-router';
import accessGuard from '../helpers/accessGuard';
import { getAllUsers, getUserByPk } from '../controllers/userController';
import { selectAll, create, update, removeByPk, removeAll } from '../controllers/cartController';

const userRouter = Router();

// Routes

userRouter.route('/').get(accessGuard('Admin'), getAllUsers);

userRouter.route('/:userId').get(accessGuard('Admin'), getUserByPk);

userRouter
	.route('/:userId/cart')
	.get(accessGuard('Admin'), selectAll)
	.post(accessGuard('Admin'), create)
	.delete(accessGuard('Admin'), removeAll);

userRouter
	.route('/:userId/cart/:cartId')
	.delete(accessGuard('Admin'), removeByPk)
	.put(accessGuard('Admin'), update);

// Export
export default userRouter;
