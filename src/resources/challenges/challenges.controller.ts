import { Response, NextFunction } from 'express';
import Challenge from '../../models/Challenge';
import { CREATED, OK, NOT_FOUND } from '../../constants/status-codes';
import { notExists, alreadyExists, forbiddenAccess, created } from '../../constants/messages';
import jsonReponse from '../../helpers/jsonResponse';
import asyncHandler from '../../middlewares/asyncHandler';
import ChallengeTestCase from '../../models/ChallengeTestCase';

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
   * get one
   * @param {any} req
   * @param {object} res
   * @returns {Object} Returns an object
   */
  static getOne = asyncHandler(
    async (req: any, res: Response): Promise<any> => {
      const { challenge } = req;

      const pupulated = await Challenge.findById(challenge._id).populate('testCases');
      // await challenge.populate('testCases.ChallengeTestCase');

      return jsonReponse({
        res,
        data: pupulated,
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
      const foundChallenge = await Challenge.findById(challengeId);

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
      const { challenge, body, currentUser } = req;

      const data = {
        ...body,
        challenge: challenge._id,
        inputs: JSON.stringify(body.inputs),
      };

      const foundTest = await ChallengeTestCase.findOne({
        ...data,
      });

      if (foundTest) {
        return jsonReponse({
          res,
          status: OK,
          message: alreadyExists('Test case'),
        });
      }

      const testCase = await ChallengeTestCase.create({
        ...data,
        user: currentUser._id,
      });

      challenge.testCases.push(testCase._id);

      await challenge.save();

      jsonReponse({
        res,
        status: OK,
        message: created('Test case'),
        data: challenge.toObject(),
        datad: data,
      });
    },
  );

  /**
   * Add Test Case
   * @param {any} req
   * @param {object} res
   * @returns {Object} Returns an object
   */
  static getAll = asyncHandler(
    async (req: any, res: Response): Promise<any> => {
      const records = await Challenge.find();

      jsonReponse({
        res,
        status: OK,
        data: records,
      });
    },
  );
}

export default ChallengeController;
