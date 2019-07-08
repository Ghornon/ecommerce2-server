import Router from 'express-promise-router';
import {
	selectCartItems,
	addToCart,
	updateCartItemByPk,
	removeCartItemByPk,
	removeAllCartItems
} from '../controllers/cartController';

const cartRouter = Router();

// Routes

cartRouter
	.route('/')
	.get(selectCartItems)
	.post(addToCart)
	.delete(removeAllCartItems);

cartRouter
	.route('/:cartId')
	.delete(removeCartItemByPk)
	.put(updateCartItemByPk);

// Export
export default cartRouter;
