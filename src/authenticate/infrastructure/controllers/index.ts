// import  { incident_report_Service }  from '@incident_report/services';
import AdminController from './admin.controllers';
import AuthenticateController from './oauth.controllers';

// const adminController = new AdminController(incident_report_Service);
const adminController = new AdminController();
const authentication = new AuthenticateController();
export { adminController,authentication };
