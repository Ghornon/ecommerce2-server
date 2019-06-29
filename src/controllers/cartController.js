import Cart from '../models/cartModel';
import Inventory from '../models/inventoryModel';

const selectAll = async (req, res) => {
	const { id } = req.user;

	const cart = await Cart.findAll({
		where: {
			userId: id
		},
		attributes: ['id', 'quantity'],
		include: [{ model: Inventory, as: 'inventory' }]
	});

	return res.status(200).json({ cart });
};

const create = async (req, res) => {
	const { id } = req.user;
	const { inventoryId, quantity = 1 } = req.body;

	const [cart, isNewRecord] = await Cart.findOrCreate({
		where: { userId: id, inventoryId },
		defaults: {
			userId: id,
			inventoryId,
			quantity
		},
		attributes: ['id', 'quantity'],
		include: [{ model: Inventory, as: 'inventory' }]
	});

	if (!isNewRecord) {
		return res.status(409).json({ error: 'Item is already in a cart' });
	}

	return res.status(201).json({ cart });
};

const update = async (req, res) => {
	const { id } = req.user;
	const { cartId } = req.params;
	const { quantity = 1 } = req.body;

	const rowUpdated = await Cart.update(
		{ quantity },
		{
			where: {
				id: cartId,
				userId: id
			}
		}
	);

	if (!rowUpdated) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json();
};

const removeByPk = async (req, res) => {
	const { id } = req.user;
	const { cartId } = req.params;

	const rowDestroyed = await Cart.destroy({
		where: {
			id: cartId,
			userId: id
		}
	});

	if (!rowDestroyed) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json();
};

const removeAll = async (req, res) => {
	const { id } = req.user;

	const rowDestroyed = await Cart.destroy({
		where: {
			userId: id
		}
	});

	if (!rowDestroyed) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json();
};

export { selectAll, create, update, removeByPk, removeAll };
