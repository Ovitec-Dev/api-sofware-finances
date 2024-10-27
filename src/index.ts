import { Database } from '@shared/db';
import { config } from '@shared/index';
import { Server } from '@server/index';
import authenticate_Routes from '@authenticate/infrastructure/routers';
import finance_Routes from '@finance/infrastructure/routers';

(async () => {
  const database = new Database(config.DB_CONNECTION);
  await database.authenticate();
  // const routes = [...(await authenticate_Routes())];
  const routes = [...(await authenticate_Routes()), ...(await finance_Routes())];
  const server = new Server(config.PORT, routes);
  server.start();
})();
