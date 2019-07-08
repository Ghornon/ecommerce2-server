import Sequelize, { Model } from 'sequelize';
import database from '../helpers/database';

import Inventory from './inventoryModel';
import OrdersMeta from './ordersMetaModel';

class OrdersItemsList extends Model {}

OrdersItemsList.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			field: 'item_id',
			autoIncrement: true
		},
		inventoryId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'inventory_id'
		},
		metaId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'orders_meta_id'
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize: database,
		timestamps: false,
		modelName: 'ordersItemList',
		tableName: 'orders_items_list'
	}
);

OrdersItemsList.hasOne(Inventory, { foreignKey: 'id', sourceKey: 'inventoryId' });
OrdersItemsList.hasOne(OrdersMeta, { foreignKey: 'id', sourceKey: 'metaId' });

export default OrdersItemsList;
