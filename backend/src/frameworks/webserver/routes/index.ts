
import { Application } from 'express';
import authRouter from './auth';
import companyRouter from './company';
import adminAuthRouter from './adminAuthRoute';
import adminRouter from './admin';




const routes = (app:Application)=>{
  app.use('/api/auth', authRouter());
  app.use('/api/company',companyRouter())
  app.use('/api/admin/auth',adminAuthRouter())
  app.use('/api/admin',adminRouter())

}

export default routes

