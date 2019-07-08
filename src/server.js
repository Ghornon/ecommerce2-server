import 'dotenv/config'; // Import config from .env
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Helpers

import database from './helpers/database';
import Logger from './helpers/logger';
import passport from './helpers/passport';

// Routers

import authRouter from './routes/authRouter';
import invetoryRouter from './routes/invetoryRouter';
import userRouter from './routes/userRouter';
import ordersRouter from './routes/ordersRouter';

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
app.use('/api/users', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/api/orders', passport.authenticate('jwt', { session: false }), ordersRouter);

// Server
const port = process.env.PORT || 8080;

app.listen(port, () => Logger.info(`Test app listening on port ${port}!`));
