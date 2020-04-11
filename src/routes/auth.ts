import { Router } from 'express';
import passport from '../config/passport';
import UserController from '../controllers/user.controller';

const router = Router();

router.get('/github', passport.authenticate('github', { scope: ['email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github'),
  UserController.socialLogin,
);

export default router;
