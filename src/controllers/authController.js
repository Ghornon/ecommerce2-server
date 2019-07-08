import User from '../models/userModel';

import { signToken, genHash } from '../helpers/authHelper';

const signIn = async (req, res) => {
	// Create token
	const token = signToken(req.user.id);

	// Send token
	return res.status(200).json({ token });
};

const signUp = async (req, res) => {
	const { login, password, email, firstName = '', lastName = '' } = req.body;

	const hash = await genHash(password);

	const [user, created] = await User.findOrCreate({
		where: { login },
		defaults: { login, password: hash, email, firstName, lastName, permissionId: 6 }
	});

	if (!created) {
		return res.status(409).json({ error: 'Login is already in use!' });
	}

	const token = signToken(user.id);

	// Send token
	return res.status(201).json({ token });
};

export { signIn, signUp };
