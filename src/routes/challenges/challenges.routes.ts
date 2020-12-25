import { Router } from 'express';
import ChallengeController from '../../controllers/challenge.controller';
import checkAuth from '../../middlewares/checkAuth';
import * as validators from './challenges.validators';

const router = Router();

router.post('/', checkAuth, validators.createOne, ChallengeController.createOne);

export default router;
