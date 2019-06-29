import Sequelize, { Model } from 'sequelize';
import database from '../helpers/database';
import Permission from './permissionModel';

class User extends Model {
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	set fullName(value) {
		const names = value.split(' ');
		this.setDataValue('firstName', names.slice(0, -1).join(' '));
		this.setDataValue('lastName', names.slice(-1).join(' '));
	}
}

User.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			field: 'user_id',
			autoIncrement: true
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

User.hasOne(Permission, { foreignKey: 'id', sourceKey: 'permissionId' });

export default User;
