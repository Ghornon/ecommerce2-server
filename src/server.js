import 'dotenv/config'; // Import config from .env
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Helpers

import database from './helpers/database';
import Logger from './helpers/logger';

// Routers

import authRouter from './routes/authRouter';
import invetoryRouter from './routes/invetoryRouter';
import cartRouter from './routes/cartRouter';

// Config

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

database
	.authenticate()
	.then(() => {
		Logger.ok('Connection has been established successfully.');
	})
	.catch(err => {
		Logger.error('Unable to connect to the database:', err);
	});

// Routes

app.use('/api/auth', authRouter);
app.use('/api/inventory', invetoryRouter);
app.use('/api/cart', cartRouter);

// Server
const port = process.env.PORT || 8080;

/* eslint no-console: 0 */
app.listen(port, () => Logger.info(`Test app listening on port ${port}!`));
