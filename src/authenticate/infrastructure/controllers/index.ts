// import  { incident_report_Service }  from '@incident_report/services';
import AuthenticationController from './authenticate.controllers';
import AuthenticateController from './oauth.controllers';

// const adminController = new AdminController(incident_report_Service);
const adminController = new AuthenticationController();
const authentication = new AuthenticateController();
export { adminController,authentication };
