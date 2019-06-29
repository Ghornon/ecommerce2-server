import Router from 'express-promise-router';
import { getAll, getById } from '../controllers/inventoryController';

const inventoryRouter = Router();

// Routes

inventoryRouter.route('/').get(getAll);

inventoryRouter.route('/:inventoryId').get(getById);

// Export
export default inventoryRouter;
