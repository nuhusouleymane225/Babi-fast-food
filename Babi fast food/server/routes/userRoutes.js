import express from 'express';
import { userSignup, userLogin } from '../controllers/usersController';
import { signupValidator, loginValidator } from '../middlewares/authInputValidations';

const userRouter = express.Router();

userRouter.post('/auth/signup', signupValidator, userSignup);
userRouter.post('/auth/login', loginValidator, userLogin);

export default userRouter;
