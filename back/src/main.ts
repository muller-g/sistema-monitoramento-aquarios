import app from '../src/infra/server';
import DeviceController from './infra/http/api/DeviceController';
import LoginController from './infra/http/api/LoginController';
import UserController from './infra/http/api/UserController';
import logger from './service/WinstonLogger';

new UserController();
new LoginController();
new DeviceController();

app.listen(3001, () => {
    logger.info(`Express is listening at http://localhost:3001`);
});