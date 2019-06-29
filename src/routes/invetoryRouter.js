import Router from 'express-promise-router';
import passport from '../helpers/passport';
import guard from '../helpers/guard';
import { getAll, getByPk, create, update, removeByPk } from '../controllers/inventoryController';

const inventoryRouter = Router();

// Routes

inventoryRouter
	.route('/')
	.get(getAll)
	.post(passport.authenticate('jwt', { session: false }), guard, create);

inventoryRouter
	.route('/:inventoryId')
	.get(getByPk)
	.put(passport.authenticate('jwt', { session: false }), guard, update)
	.delete(passport.authenticate('jwt', { session: false }), guard, removeByPk);

// Export
export default inventoryRouter;
