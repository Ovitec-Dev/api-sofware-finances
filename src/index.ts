// import { Database } from '@shared/db';
import { config } from '@shared/index';
import { Server } from '@server/index';
import authenticate_Routes from '@authenticate/infrastructure/routers';
// import incident_reportRoutes from '@authenticate/routes';
(async () => {
  // const database = new Database(config.DB_CONNECTION);
  // await database.authenticate();
  const routes = [...(await authenticate_Routes())];
  // const routes = [...(await incident_reportRoutes()),...(await Authentication())];
  const server = new Server(config.PORT, routes);
  server.start();
})();
