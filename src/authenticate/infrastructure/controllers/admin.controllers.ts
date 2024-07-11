import { NextFunction, Request, Response } from 'express';
// import { IIncident_report_Service } from '../../models';
// import { ICase } from '../../models/case.model';

class AdminController {
  // constructor(private readonly incident_report_Service:IIncident_report_Service<ICase> ) {
  constructor( ) {
    this.list_case = this.list_case.bind(this);
  }

  list_case = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = ' i will runnig at future'
        
        return res.json(result);
    } catch (err) {
      return next(err);
    }
  };
}

export default AdminController;
