import UserController from '../../controllers/user.controller';
import User from '../../models/User';
import db from '../../models';
import { githubUser } from '../../__mocks__/users';

/**
 * Response
 */
const res = {
  redirect: (): object => ({}),
  status: (): object => ({
    json: (): object => ({}),
  }),
};

/**
 * Request
 */
const req = {
  user: githubUser,
};

jest.setTimeout(30000);

describe('Github Social login', () => {
  beforeAll(async () => {
    await db.connect();
    await User.remove({ email: githubUser.emails[0].value });
    jest.spyOn(res, 'redirect');
  });

  it('Should mock the social login controller', async () => {
    await UserController.socialLogin(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  afterAll(async () => {
    await User.remove({ email: githubUser.emails[0].value });
    await db.disconnect();
    jest.clearAllMocks();
  });
});
