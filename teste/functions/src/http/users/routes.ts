import { ensureAuthentication } from '@burand/functions/middlewares';
import { Router } from 'express';
import { handleCreateAdmin } from './use-cases/createAdmin/index.js';
import { handleCreateUser } from './use-cases/createUsers/index.js';
import { handleUpdateUser } from './use-cases/updateUsers/index.js';

const routes = Router();

routes.use(ensureAuthentication);

routes.post('/', handleCreateUser);
routes.post('/admins', handleCreateAdmin);
routes.put('/:id', handleUpdateUser);

export default routes;
