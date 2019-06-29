import Sequelize, { Model } from 'sequelize';
import database from '../helpers/database';

import User from './userModel';
import Inventory from './inventoryModel';

class Cart extends Model {}

Cart.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			field: 'cart_id',
			autoIncrement: true
		},
		userId: {
			type: Sequelize.INTEGER,
			field: 'user_id',
			allowNull: false
		},
		inventoryId: {
			type: Sequelize.INTEGER,
			field: 'inventory_id',
			allowNull: false
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize: database,
		timestamps: false,
		modelName: 'cart'
	}
);

Cart.hasOne(User, { foreignKey: 'id', sourceKey: 'userId' });
Cart.hasOne(Inventory, { foreignKey: 'id', sourceKey: 'inventoryId' });

export default Cart;
