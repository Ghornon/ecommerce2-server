import User from '../models/userModel';
import Permission from '../models/permissionModel';

const guard = async (req, res, next) => {
	const { id } = req.user;

	const {
		permission: { power }
	} = await User.findByPk(id, {
		attributes: ['id', 'permissionId'],
		include: [{ model: Permission }]
	}).then(data => data.get({ plain: true }));

	if (power >= 5) return next();

	return res.status(401).json();
};

export default guard;
