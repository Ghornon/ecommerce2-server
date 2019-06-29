import Router from 'express-promise-router';
import passport from '../helpers/passport';
import { selectAll, create, update, removeByPk, removeAll } from '../controllers/cartController';

const cartRouter = Router();

// Routes

cartRouter
	.route('/')
	.get(passport.authenticate('jwt', { session: false }), selectAll)
	.post(passport.authenticate('jwt', { session: false }), create)
	.delete(passport.authenticate('jwt', { session: false }), removeAll);

cartRouter
	.route('/:cartId')
	.delete(passport.authenticate('jwt', { session: false }), removeByPk)
	.put(passport.authenticate('jwt', { session: false }), update);

// Export
export default cartRouter;
