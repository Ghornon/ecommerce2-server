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

app.use(morgan('dev'));
app.use(bodyParser.json());

database
	.authenticate()
	.then(() => {
		console.info('Connection has been established successfully.');

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
		console.error('Unable to connect to the database:', err);
	});

// Routes

app.use('/api/auth', authRouter);

// Server
const port = process.env.PORT || 8080;

/* eslint no-console: 0 */
app.listen(port, () => console.info(`[Server] Test app listening on port ${port}!`));
