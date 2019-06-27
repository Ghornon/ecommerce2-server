import 'dotenv/config'; // Import config from .env
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import database from './helpers/database';
import Logger from './helpers/logger';
import authRouter from './routes/authRouter';

import User from './models/userModel';

// Config

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

database
	.authenticate()
	.then(() => {
		Logger.ok('Connection has been established successfully.');

		User.findOrCreate({
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

		User.findOne({ where: { login: 'John' } }).then(data =>
			console.log('User John: ', data.get())
		);
	})
	.catch(err => {
		Logger.error('Unable to connect to the database:', err);
	});

// Routes

app.use('/api/auth', authRouter);

// Server
const port = process.env.PORT || 8080;

/* eslint no-console: 0 */
app.listen(port, () => Logger.info(`Test app listening on port ${port}!`));
