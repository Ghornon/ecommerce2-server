import Router from 'express-promise-router';
import passport from '../helpers/passport';
import { signIn, signUp } from '../controllers/authController';

const authRouter = Router();
// Routes

authRouter.route('/signup').post(signUp);

authRouter.route('/signin').post(passport.authenticate('local', { session: false }), signIn);

// Export
export default authRouter;
