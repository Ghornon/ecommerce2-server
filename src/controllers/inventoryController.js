import Inventory from '../models/inventoryModel';

const getAll = async (req, res) => {
	const inventory = await Inventory.findAll();

	return res.status(200).json({ inventory });
};

const getByPk = async (req, res) => {
	const { inventoryId } = req.params;

	const inventory = await Inventory.findByPk(inventoryId);

	return res.status(200).json({ inventory });
};

const create = async (req, res) => {
	const { name, description, image, price, sale = 0 } = req.body;

	const [item, isNewRecord] = await Inventory.findOrCreate({
		where: { name },
		defaults: {
			name,
			description,
			image,
			price,
			sale
		}
	});

	if (!isNewRecord) {
		return res.status(409).json({ error: 'Item already exists' });
	}

	return res.status(201).json({ item });
};

const update = async (req, res) => {
	const { inventoryId } = req.params;
	const { name, description, image, price, sale = 0 } = req.body;

	const rowUpdated = await Inventory.update(
		{ name, description, image, price, sale },
		{
			where: {
				id: inventoryId
			}
		}
	);

	if (!rowUpdated) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json();
};

const removeByPk = async (req, res) => {
	const { inventoryId } = req.params;

	const rowDestroyed = await Inventory.destroy({
		where: {
			id: inventoryId
		}
	});

	if (!rowDestroyed) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json();
};

export { getAll, getByPk, create, update, removeByPk };
