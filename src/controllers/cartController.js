import Cart from '../models/cartModel';
import Inventory from '../models/inventoryModel';

const selectCartItems = async (req, res) => {
	const { userId } = req.target;

	const cart = await Cart.findAll({
		where: {
			userId
		},
		attributes: ['id', 'quantity'],
		include: [{ model: Inventory, as: 'inventory' }]
	});

	return res.status(200).json(cart);
};

const addToCart = async (req, res) => {
	const { userId } = req.target;
	const { inventoryId, quantity = 1 } = req.body;

	const [cart, created] = await Cart.findOrCreate({
		where: { userId, inventoryId },
		defaults: {
			userId,
			inventoryId,
			quantity
		},
		attributes: ['id', 'quantity'],
		include: [{ model: Inventory, as: 'inventory' }]
	});

	if (!created) {
		return res.status(409).json({ error: 'Item is already in a cart' });
	}

	return res.status(201).json(cart);
};

const updateCartItemByPk = async (req, res) => {
	const { userId } = req.target;
	const { cartId } = req.params;
	const { quantity = 1 } = req.body;

	const rowUpdated = await Cart.update(
		{ quantity },
		{
			where: {
				id: cartId,
				userId
			}
		}
	);

	if (!rowUpdated) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(204).json();
};

const removeCartItemByPk = async (req, res) => {
	const { userId } = req.target;
	const { cartId } = req.params;

	const rowDestroyed = await Cart.destroy({
		where: {
			id: cartId,
			userId
		}
	});

	if (!rowDestroyed) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(204).json();
};

const removeAllCartItems = async (req, res) => {
	const { userId } = req.target;

	const rowDestroyed = await Cart.destroy({
		where: {
			userId
		}
	});

	if (!rowDestroyed) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(204).json();
};

export { selectCartItems, addToCart, updateCartItemByPk, removeCartItemByPk, removeAllCartItems };
