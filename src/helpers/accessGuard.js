import { Op } from 'sequelize';
import Permission from '../models/permissionModel';

const accessGuard = role => async (req, res, next) => {
	const { userId } = req.params;
	const {
		id,
		permission: { power }
	} = req.user;

	const neededPermissions = await Permission.findOne({
		where: {
			label: {
				[Op.like]: `%${role}%`
			}
		}
	}).then(data => (data ? data.get() : null));

	if (neededPermissions && userId) {
		const access = {
			self: userId === 'me' || id === parseInt(userId, 10),
			role: power >= neededPermissions.power
		};

		if (access.role || access.self) {
			req.access = access;
			req.target = { id: userId === 'me' ? id : userId };

			return next();
		}
	}

	return res.status(403).json();
};

export default accessGuard;
