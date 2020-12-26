import User from '../../models/User';
import generateToken from '../../helpers/generateToken';
import asyncHandler from '../../middlewares/asyncHandler';
import jsonResponse from '../../helpers/jsonResponse';

const { FRONTEND_URL } = process.env;

/**
 * UserController
 */
export default class UserController {
  /**
   * socialLogin
   * @param {any} req
   * @param {any} res
   * @returns {any} Request response
   */
  static socialLogin = asyncHandler(
    async (req: any, res: any): Promise<any> => {
      const { user } = req;
      const { username } = user;

      let foundUser: any = await User.findOne({ username });

      if (!foundUser) {
        const [firstName = '', ...lastName] = (user.displayName || '').split(/\s+/g);
        const password = generateToken({});
        const userData = {
          firstName,
          lastName: lastName.join(' '),
          username,
          email: user._json.email,
          picture: user._json.avatar_url,
          password,
        };
        foundUser = await User.create(userData);
      }

      const token = generateToken({
        _id: foundUser._id,
        username: foundUser.username,
      });

      return res.redirect(`${FRONTEND_URL}?token=${token}`);
    },
  );
}
