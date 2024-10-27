import { NextFunction, Request, Response } from 'express';
import { ICategoryService } from '@finance/models';
import { Category, SubCategory } from '@shared/models';
import { verify_token } from '@shared/index';
// import { verify_token } from '@shared/index';

class CategoryController {
  constructor(private readonly category_Service:ICategoryService<Category> ) {
//   constructor() {
    this.create_category = this.create_category.bind(this);
    this.get_category_by_id = this.get_category_by_id.bind(this);
    this.get_all_categorys_by_user = this.get_all_categorys_by_user.bind(this);
    this.update_category_id = this.update_category_id.bind(this);
    this.delete_category_id = this.delete_category_id.bind(this);
    
    this.get_sub_category_by_category = this.get_sub_category_by_category.bind(this);
    this.create_sub_category = this.create_sub_category.bind(this);
    this.update_sub_category_id = this.update_sub_category_id.bind(this);
    this.delete_sub_category_id = this.delete_sub_category_id.bind(this);
  }

   async create_category(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        const category = req.body as unknown as Category;
        if (!authHeader || !authHeader.startsWith('Bearer '))throw new Error('general.UNAUTHORIZED.missing_access_key');
        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
        const user = await verify_token(token);
        const rto = await this.category_Service.create_category(category,parseInt(user.id, 10));
        res.status(200).json({ rto });
    } catch (error) {
      next(error);
    }
  }

   async create_sub_category(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        const Subcategory = req.body as unknown as SubCategory;
        if (!authHeader || !authHeader.startsWith('Bearer '))throw new Error('general.UNAUTHORIZED.missing_access_key');
        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
        const user = await verify_token(token);
        const rto = await this.category_Service.create_subcategory(Subcategory,parseInt(user.id, 10));
        res.status(200).json({ rto });
    } catch (error) {
      next(error);
    }
  }

  async get_category_by_id(req: Request, res: Response, next: NextFunction) {
    try {
        const { trasaction_id } = req.params ;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))throw new Error('general.UNAUTHORIZED.missing_access_key');
        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
        const user = await verify_token(token);
        if(!trasaction_id) throw new Error('trasaction_id is required');
        const rto = await this.category_Service.get_categories_by_id(parseInt(trasaction_id, 10),parseInt(user.id, 10));
      res.status(200).json( rto );
    } catch (error) {
      next(error);
    }
  }

  async get_all_categorys_by_user(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))throw new Error('general.UNAUTHORIZED.missing_access_key');
        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
        const user = await verify_token(token);
        const rto = await this.category_Service.get_all_category_by_user(parseInt(user.id, 10));
      res.status(200).json( rto );
    } catch (error) {
      next(error);
    }
  }

  async get_sub_category_by_category(req: Request, res: Response, next: NextFunction) {
    try {
        const id_category = req.params  as unknown as string;
        const rto = await this.category_Service.get_subcategories_by_category(parseInt(id_category));
      res.status(200).json( rto );
    } catch (error) {
      next(error);
    }
  }


  async update_category_id(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const  category_details = req.body as unknown as Partial<Category>;
      const rto = await this.category_Service.update_category_id(id, category_details);
      res.status(200).json( rto );
      // res.status(200).json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  }

  async delete_category_id(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const  rto = await this.category_Service.delete_category_id(id);
      res.status(200).json( rto );
      } catch (error) {
      next(error);
    }
  }

  async update_sub_category_id(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const  subcategory_details = req.body as unknown as Partial<SubCategory>;
      const rto = await this.category_Service.update_sub_category_id(id, subcategory_details);
      res.status(200).json( rto );
    } catch (error) {
      next(error);
    }
  }

  async delete_sub_category_id(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const  rto = await this.category_Service.delete_sub_category_id(id);
      res.status(200).json( rto );
      } catch (error) {
      next(error);
    }
  }


}

export default  CategoryController;

