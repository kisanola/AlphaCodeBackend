import { Router } from 'express';
import ChallengeController from '../controllers/challenge.controller';
import checkAuth from '../middlewares/checkAuth';

const router = Router();

router.post('/submit', checkAuth, ChallengeController.submit);

export default router;
