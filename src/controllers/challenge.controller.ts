import { Request, Response, NextFunction } from 'express';
import Challenge from '../models/Challenge';
import { CREATED, OK, NOT_FOUND } from '../constants/status-codes';
import { notExists, forbiddenAccess, created } from '../constants/messages';
import jsonReponse from '../helpers/jsonResponse';
import asyncHandler from '../middlewares/asyncHandler';

/**
 *
 * @class ChallengeController
 */
class ChallengeController {
  /**
   * submit
   * @param {any} req
   * @param {object} res
   * @returns {Object} Returns an object
   */
  static createOne = asyncHandler(
    async (req: any, res: Response): Promise<any> => {
      const { functionName, params, returnType } = req.body;
      const challenge = await Challenge.create({
        functionName,
        params,
        returnType: returnType,
        user: req.currentUser._id,
      });

      return jsonReponse({
        res,
        status: CREATED,
        message: created('Challenge'),
        data: challenge,
      });
    },
  );

  /**
   * Check Challenge
   * @param {any} req
   * @param {object} res
   * @returns {Object} Returns an object
   */
  static checkChallenge = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      const { challengeId } = req.params;
      const foundChallenge = Challenge.findById(challengeId);

      if (!foundChallenge) {
        jsonReponse({
          res,
          status: NOT_FOUND,
          message: notExists('Challenge'),
        });
      }

      req.challenge = foundChallenge;
      next();
    },
  );

  /**
   * Check Ownership
   * @param {any} req
   * @param {object} res
   * @returns {Object} Returns an object
   */
  static checkOwnership = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      const { challenge, currentUser } = req;

      if (!challenge || !currentUser._id.equals(challenge.user)) {
        jsonReponse({
          res,
          status: NOT_FOUND,
          message: forbiddenAccess(),
        });
      }

      next();
    },
  );

  /**
   * Add Test Case
   * @param {any} req
   * @param {object} res
   * @returns {Object} Returns an object
   */
  static addTestCase = asyncHandler(
    async (req: any, res: Response): Promise<any> => {
      const { challenge, body } = req;

      challenge.push(body);

      await challenge.save();

      jsonReponse({
        res,
        status: OK,
        message: created('Test case'),
      });
    },
  );
}

export default ChallengeController;
