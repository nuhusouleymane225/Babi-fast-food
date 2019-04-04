import express from 'express';
import {
  postMenu, getAllMenu, updateMenuItem, deleteMenu, getSpecificMenu, getAllMenuAdminDashboard
} from '../controllers/menusController';
import { verifyToken, authorizedAdmin } from '../middlewares/authorization';
import {
  postMenuValidator, getSpecificMenuValidator
} from '../middlewares/menuInputValidations';

const menuRouter = express.Router();

menuRouter.post('/menu', verifyToken, authorizedAdmin, postMenuValidator, postMenu);
menuRouter.get('/menu', getAllMenu);
menuRouter.get('/menu/admin', getAllMenuAdminDashboard);
menuRouter.put('/menu/:menuId', verifyToken, authorizedAdmin, getSpecificMenuValidator, postMenuValidator, updateMenuItem);
menuRouter.delete('/menu/:menuId', verifyToken, authorizedAdmin, getSpecificMenuValidator, deleteMenu);
menuRouter.get('/menu/:menuId', verifyToken, authorizedAdmin, getSpecificMenuValidator, getSpecificMenu);

export default menuRouter;
