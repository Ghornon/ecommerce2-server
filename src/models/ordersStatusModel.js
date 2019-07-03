import Sequelize, { Model } from 'sequelize';
import database from '../helpers/database';

class OrdersStatus extends Model {}

OrdersStatus.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			field: 'status_id',
			autoIncrement: true
		},
		label: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		sequelize: database,
		timestamps: false,
		modelName: 'ordersStatus',
		tableName: 'orders_status'
	}
);

export default OrdersStatus;
