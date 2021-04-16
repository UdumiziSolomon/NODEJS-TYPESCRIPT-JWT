  "use strict";
import express from 'express';
import * as cors from 'cors';
import { userRegisterController, userLoginController, accessUsers , validateTokRoute }  from '../controller/userController';
import { validateRoute } from '../middlewares/jwt';

export const appRouter = express.Router({
  caseSensitive: true, strict: true
});

// routes
appRouter.post('/register', userRegisterController);
appRouter.post('/login', userLoginController);
appRouter.get('/users', accessUsers);
appRouter.get('/profile', validateRoute , validateTokRoute );