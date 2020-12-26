import { Router } from 'express';
import auth from './auth/auth.routes';
import challenge from './challenges/challenges.routes';

const router = Router();

router.use('/auth', auth);
router.use('/challenges', challenge);

export default router;
