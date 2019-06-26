import Sequelize, { Model } from 'sequelize';
import database from '../helpers/database';

class Permission extends Model {}

Permission.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			field: 'permission_id'
		},
		label: {
			type: Sequelize.STRING,
			allowNull: false
		},
		power: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize: database,
		timestamps: false,
		modelName: 'permission'
	}
);

export default Permission;
