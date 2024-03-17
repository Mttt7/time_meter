import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.route('/')
    .get(authController.getAuthURL)

router.route('/isUserLogged')
    .get(authController.isLogged)

router.route('/redirect')
    .get(authController.handleCallback)



export default router;
