import Inventory from '../models/inventoryModel';

const getAll = async (req, res) => {
	const inventory = await Inventory.findAll();

	return res.status(200).json({ inventory });
};

const getById = async (req, res) => {
	const { inventoryId } = req.params;

	const inventory = await Inventory.findByPk(inventoryId);

	return res.status(200).json({ inventory });
};

export { getAll, getById };
