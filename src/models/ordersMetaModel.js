import Sequelize, { Model } from 'sequelize';
import database from '../helpers/database';

import User from './userModel';
import OrdersStatus from './ordersStatusModel';

class OrdersMeta extends Model {}

OrdersMeta.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			field: 'meta_id',
			autoIncrement: true
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'user_id'
		},
		statusId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'status_id'
		}
	},
	{
		sequelize: database,
		timestamps: false,
		modelName: 'ordersMeta',
		tableName: 'orders_meta'
	}
);

OrdersMeta.hasOne(User, { foreignKey: 'id', sourceKey: 'userId' });
OrdersMeta.hasOne(OrdersStatus, { foreignKey: 'id', sourceKey: 'statusId' });

export default OrdersMeta;
