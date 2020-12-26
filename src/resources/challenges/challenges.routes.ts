import { Router } from 'express';
import ChallengeController from './challenges.controller';
import checkAuth from '../../middlewares/checkAuth';
import * as validators from './challenges.validators';

const router = Router();

router
  .route('/')
  .all(checkAuth)
  .post(validators.createOne, ChallengeController.createOne)
  .get(ChallengeController.getAll);

router.get('/:challengeId', checkAuth, ChallengeController.checkChallenge, ChallengeController.getOne);

router.post(
  '/:challengeId/tests',
  checkAuth,
  validators.addTestCase,
  ChallengeController.checkChallenge,
  ChallengeController.addTestCase,
);

export default router;
