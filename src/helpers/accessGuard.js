import { Op } from 'sequelize';
import Permission from '../models/permissionModel';

const accessGuard = (selfAccess, role) => async (req, res, next) => {
	const { userId = res.locals.userId } = req.params;

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

	if (neededPermissions) {
		const access = {
			selfAccess: selfAccess ? userId === 'me' || id === parseInt(userId, 10) : false,
			role: power >= neededPermissions.power
		};

		if (access.role || access.selfAccess) {
			req.access = access;
			req.target = { userId: userId === 'me' ? id : userId };

			return next();
		}
	}

	return res.status(403).json();
};

export default accessGuard;
