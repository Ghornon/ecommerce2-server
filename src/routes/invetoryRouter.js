import Router from 'express-promise-router';
import passport from '../helpers/passport';
import accessGuard from '../helpers/accessGuard';
import { getAll, getByPk, create, update, removeByPk } from '../controllers/inventoryController';

const inventoryRouter = Router();

// Routes

inventoryRouter
	.route('/')
	.get(getAll)
	.post(passport.authenticate('jwt', { session: false }), accessGuard('Admin'), create);

inventoryRouter
	.route('/:inventoryId')
	.get(passport.authenticate('jwt', { session: false }), accessGuard('Admin'), getByPk)
	.put(passport.authenticate('jwt', { session: false }), accessGuard('Admin'), update)
	.delete(passport.authenticate('jwt', { session: false }), accessGuard('Admin'), removeByPk);

// Export
export default inventoryRouter;
