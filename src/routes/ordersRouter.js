import Router from 'express-promise-router';
import accessGuard from '../helpers/accessGuard';
import {
	getAllOrdersMeta,
	getOrderMetaByPk,
	getOrderItemsList,
	createOrderMeta,
	createOrderItem,
	updateOrderMetaByPk,
	updateOrderItemByPk,
	removeOrderMetaByPk,
	removeOrderItemsList,
	removeOrderItemByPk
} from '../controllers/ordersController';

const ordersRouter = Router();

// Routes

ordersRouter
	.route('/')
	.get(accessGuard(true, 'Service worker'), getAllOrdersMeta)
	.post(accessGuard(true, 'Service worker'), createOrderMeta);

ordersRouter
	.route('/:orderId')
	.get(accessGuard(true, 'Service worker'), getOrderMetaByPk)
	.put(accessGuard(false, 'Service worker'), updateOrderMetaByPk)
	.delete(accessGuard(false, 'Service menager'), removeOrderMetaByPk);

ordersRouter
	.route('/:orderId/items')
	.get(accessGuard(true, 'Service worker'), getOrderItemsList)
	.post(accessGuard(false, 'Service worker'), createOrderItem)
	.delete(accessGuard(false, 'Service menager'), removeOrderItemsList);

ordersRouter
	.route('/:orderId/items/:itemId')
	.put(accessGuard(false, 'Service worker'), updateOrderItemByPk)
	.delete(accessGuard(false, 'Service worker'), removeOrderItemByPk);

// Export
export default ordersRouter;
