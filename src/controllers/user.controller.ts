import User from '../models/User';
import generateToken from '../helpers/generateToken';
import asyncHandler from '../middlewares/asyncHandler';

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
      const email = user.emails[0].value;

      let foundUser: any = await User.findOne({ email });

      if (!foundUser) {
        const [firstName = '', lastName = ''] = (user.displayName || '').split(/\s+/g,);
        const password = generateToken({});
        const userData = {
          firstName,
          lastName,
          email,
          username: email,
          picture: user.photos[0].value,
          password,
        };
        foundUser = await User.create(userData);
      }

      const token = generateToken({
        _id: foundUser._id,
        email: foundUser.email,
      });

      return res.redirect(`${FRONTEND_URL}?token=${token}`);
    },
  );
}
