import Sequelize, { Model } from 'sequelize';
import database from '../helpers/database';

class User extends Model {
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}

User.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			field: 'user_id'
		},
		login: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		firstName: {
			type: Sequelize.STRING,
			field: 'first_name'
		},
		lastName: {
			type: Sequelize.STRING,
			field: 'last_name'
		},
		permissionId: {
			type: Sequelize.INTEGER,
			field: 'permission_id',
			allowNull: false
		}
	},
	{
		sequelize: database,
		timestamps: false,
		modelName: 'user'
	}
);

export default User;
