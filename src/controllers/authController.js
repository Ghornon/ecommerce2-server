import { signToken } from '../helpers/authHelper';

const signIn = async (req, res) => {
	// Create token
	const token = signToken(req.user.user_id);

	// Send token
	return res.status(200).json({ token });
};

const signUp = async (req, res) => {
	return res.status(201).json({ status: 'created' });
};

export { signIn, signUp };
