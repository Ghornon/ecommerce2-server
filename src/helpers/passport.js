import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import bcrypt from 'bcryptjs';

import User from '../models/userModel';

// JSON web token strategy
const JwtStrategy = passportJwt.Strategy;
const { ExtractJwt } = passportJwt;

// Local strategy
const LocalStrategy = passportLocal.Strategy;

// JSON web token strategy initialize
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
			secretOrKey: process.env.JWT_SECRET
		},
		async (payload, done) => {
			try {
				// Finde the user

				const user = await User.findById(payload.sub);

				if (!user) {
					return done(null, false);
				}

				// Authorized
				return done(null, user);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

// Local strategy strategy initialize
passport.use(
	new LocalStrategy(
		{
			usernameField: 'login',
			passwordField: 'password'
		},
		async (login, password, done) => {
			try {
				// Finde the user
				const user = await User.findOne({ where: { login } });

				if (!user) {
					return done(null, false);
				}

				// Check that password is correct
				const hash = user.password;
				const valide = await bcrypt.compare(password, hash);

				if (!valide) {
					return done(null, false);
				}

				// Authorized
				return done(null, user);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

export default passport;
