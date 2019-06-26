import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import database from './helpers/database';
import authRouter from './routes/authRouter';

import User from './models/userModel';

// Config

dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

database
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
		User.sync().then(() => {
			// Now the `users` table in the database corresponds to the model definition
			return User.findOrCreate({
				where: { login: 'John' },
				defaults: {
					login: 'John',
					password: '1234',
					email: 'email@email.com',
					firstName: 'John',
					lastName: 'Doe',
					permissionId: 1
				}
			});
		});
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

// Routes

app.route('/api/auth', authRouter);

// Server
const port = process.env.PORT || 8080;

/* eslint no-console: 0 */
app.listen(port, () => console.log(`[Server] Test app listening on port ${port}!`));
