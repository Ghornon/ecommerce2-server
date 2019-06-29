import Sequelize, { Model } from 'sequelize';
import database from '../helpers/database';

class Inventory extends Model {}

Inventory.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			field: 'inventory_id',
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false
		},
		image: {
			type: Sequelize.STRING
		},
		price: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		sale: {
			type: Sequelize.INTEGER
		}
	},
	{
		sequelize: database,
		timestamps: false,
		modelName: 'inventory',
		tableName: 'inventory'
	}
);

export default Inventory;
