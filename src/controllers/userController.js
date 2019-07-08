import User from '../models/userModel';
import Permission from '../models/permissionModel';

const getAllUsers = async (req, res) => {
	const users = await User.findAll(
		{
			include: [
				{
					model: Permission,
					as: 'permission'
				}
			],
			attributes: ['id', 'login', 'email', 'firstName', 'lastName', 'permissionId']
		},
		{ raw: true }
	);

	if (!users) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json(users);
};

const getUserByPk = async (req, res) => {
	const { userId } = req.target;

	const user = await User.findByPk(userId, {
		include: [{ model: Permission }],
		attributes: ['id', 'login', 'email', 'firstName', 'lastName', 'permissionId']
	}).then(data => (data ? data.get({ plain: true }) : null));

	if (!user) {
		return res.status(404).json({ error: 'Not found!' });
	}

	return res.status(200).json(user);
};

export { getAllUsers, getUserByPk };
