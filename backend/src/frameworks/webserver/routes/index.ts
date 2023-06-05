
import { Application } from 'express';
import authRouter from './auth';
import companyRouter from './company';
import adminAuthRouter from './adminAuthRoute';
import adminRouter from './admin';
import LandingRouter from './Landing';

import { authenticateToken } from '../middlewares/companyinterviewerMiddleware';
import { adminauthenticateToken } from '../middlewares/adminMiddleware';

const routes = (app:Application)=>{
  app.use('/api/auth', authRouter());
  app.use('/api/company',authenticateToken,companyRouter())
  app.use('/api/admin/auth',adminAuthRouter())
  app.use('/api/admin',adminauthenticateToken,adminRouter())
  app.use('/api',LandingRouter())

}

export default routes

