import config from './env/env';
import { errorHandler } from './handler/index';
import { processField } from './utils/processField';
import { HttpClient } from './utils/HttpClient';
import { authMiddleware } from './middleware/auth.middleware';


const httpClient = new HttpClient();

export { config, processField, errorHandler, httpClient, authMiddleware };
