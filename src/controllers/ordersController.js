import OrdersMeta from '../models/ordersMetaModel';
import OrdersStatus from '../models/ordersStatusModel';
import OrdersItemsList from '../models/ordersItemsListModel';
import Inventory from '../models/inventoryModel';

const getAllOrdersMeta = async (req, res) => {
	const { userId } = req.target;
	const allowedQueries = [...Object.keys(OrdersMeta.rawAttributes)];
	const { query } = req;

	const where = {
		...Object.keys(query)
			.filter(key => allowedQueries.includes(key))
			.reduce((obj, key) => {
				return {
					...obj,
					[key]: query[key]
				};
			}, {}),
		...(userId ? { userId } : {})
	};

	const orders = await OrdersMeta.findAll({
		include: [{ model: OrdersStatus }],
		where
	});

	if (!orders) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json(orders);
};

const getOrderMetaByPk = async (req, res) => {
	const { orderId } = req.params;
	const { userId } = req.target;

	const where = {
		id: orderId,
		...(userId ? { userId } : {})
	};

	const order = await OrdersMeta.findOne({
		where,
		include: [{ model: OrdersStatus }]
	});

	if (!order) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json(order);
};

const getOrderItemsList = async (req, res) => {
	const { orderId } = req.params;
	const { userId } = req.target;
	const allowedQueries = [...Object.keys(OrdersItemsList.rawAttributes)];
	const { query } = req;

	const orderMeta = await OrdersMeta.findOne({
		where: {
			id: orderId,
			...(userId ? { userId } : {})
		}
	});

	if (!orderMeta) {
		return res.status(404).json({ error: 'Not found!' });
	}

	const ordersList = await OrdersItemsList.findAll({
		where: {
			metaId: orderMeta.id,
			...Object.keys(query)
				.filter(key => allowedQueries.includes(key))
				.reduce((obj, key) => {
					return {
						...obj,
						[key]: query[key]
					};
				}, {})
		},
		include: [{ model: Inventory, as: 'inventory' }]
	});

	return res.status(200).json(ordersList);
};

const createOrderMeta = async (req, res) => {
	const { userId, statusId } = req.body;

	const orderMeta = await OrdersMeta.create({
		userId,
		statusId
	});

	return res.status(201).json(orderMeta);
};

const createOrderItem = async (req, res) => {
	const { orderId } = req.params;
	const { userId } = req.target;

	const { inventoryId, quantity } = req.body;

	const where = {
		id: orderId,
		...(userId ? { userId } : {})
	};

	const orderMeta = await OrdersMeta.findOne({
		where,
		include: [{ model: OrdersStatus }]
	}).then(data => (data ? data.get({ plain: true }) : null));

	if (!orderMeta) {
		return res.status(404).json({ error: 'Not found!' });
	}

	const [orders, created] = await OrdersItemsList.findOrCreate({
		where: {
			inventoryId,
			metaId: orderId
		},
		defaults: {
			metaId: orderId,
			inventoryId,
			quantity
		},
		include: [{ model: Inventory, as: 'inventory' }]
	});

	if (!created) {
		return res.status(409).json({ error: 'Item is already in a order list!' });
	}

	return res.status(201).json(orders);
};

// const createOrderFromCart = async (req, res) => {};

const updateOrderMetaByPk = async (req, res) => {
	const { userId } = req.target;
	const { orderId } = req.params;
	const { statusId = 1 } = req.body;

	const where = {
		id: orderId,
		...(userId ? { userId } : {})
	};

	const rowUpdated = await OrdersMeta.update(
		{ statusId },
		{
			where
		}
	);

	if (!rowUpdated) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(204).json();
};

const updateOrderItemByPk = async (req, res) => {
	const { orderId, itemId } = req.params;
	const { quantity } = req.body;

	const rowUpdated = await OrdersItemsList.update(
		{ quantity },
		{
			where: {
				id: itemId,
				metaId: orderId
			}
		}
	);

	if (!rowUpdated) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(204).json();
};

const removeOrderMetaByPk = async (req, res) => {
	const { orderId } = req.params;

	const rowDestroyed = await OrdersMeta.destroy({
		where: {
			id: orderId
		}
	});

	if (!rowDestroyed) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(204).json();
};

const removeOrderItemsList = async (req, res) => {
	const { orderId } = req.params;

	const rowDestroyed = await OrdersItemsList.destroy({
		where: {
			metaId: orderId
		}
	});

	if (!rowDestroyed) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(204).json();
};

const removeOrderItemByPk = async (req, res) => {
	const { orderId, itemId } = req.params;

	const rowDestroyed = await OrdersItemsList.destroy({
		where: {
			id: itemId,
			metaId: orderId
		}
	});

	if (!rowDestroyed) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(204).json();
};

export {
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
};
