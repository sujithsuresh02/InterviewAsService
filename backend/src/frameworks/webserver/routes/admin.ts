import express from 'express'
import adminAuthController from '../../../adapters/controllers/Admin/authController';
import { adminRepositoryImplementation } from '../../database/Postgres/repositories/Admin/adminImplementation';
import { adminRepositoryInterface } from '../../../application/repositories/Admin/adminRepostories';
import { adminServiceImplementation } from '../../services/adminServices';
import { adminServiceInterface } from '../../../application/services/adminService';

const adminRouter = () =>{

    const controller =adminAuthController(
        adminRepositoryInterface,
        adminRepositoryImplementation,
        adminServiceInterface,
        adminServiceImplementation,
     )
      
    const router = express.Router();
    router.get('/view_request',controller.getAllRequest)

    return router
}
export default adminRouter;