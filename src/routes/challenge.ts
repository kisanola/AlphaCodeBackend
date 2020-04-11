import { Router } from 'express';
import ChallengeController from '../controllers/challenge.controller';

const router = Router();

router.post('/submit', ChallengeController.submit);

export default router;
