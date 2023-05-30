import express from 'express'
import adminAuthController from '../../../adapters/controllers/Admin/authController';
import { adminRepositoryImplementation } from '../../database/Postgres/repositories/Admin/adminImplementation';
import { adminRepositoryInterface } from '../../../application/repositories/Admin/adminRepostories';
import { adminServiceImplementation } from '../../services/adminServices';
import { adminServiceInterface } from '../../../application/services/adminService';

const adminAuthRouter = () =>{

    const controller =adminAuthController(
        adminRepositoryInterface,
        adminRepositoryImplementation,
        adminServiceInterface,
        adminServiceImplementation,
     )
      
    const router = express.Router();
    router.post('/signup',controller.adminSignup)
    router.post('/login',controller.adminLogin)

    return router
}
export default adminAuthRouter;