import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import bcrypt from 'bcryptjs';

import database from './database';

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
				const user = await database.query('SELECT * FROM users WHERE user_id = ?', [
					payload.sub
				]);

				if (user.length <= 0) {
					return done(null, false);
				}

				// Authorized
				return done(null, user[0]);
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
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			try {
				// Finde the user
				const user = await database.query('SELECT * FROM users WHERE email = ?', [email]);

				if (user.length <= 0) {
					return done(null, false);
				}

				// Check that password is correct
				const hash = user[0].password;
				const valide = await bcrypt.compare(password, hash);

				if (!valide) {
					return done(null, false);
				}

				// Authorized
				return done(null, user[0]);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

export default passport;
