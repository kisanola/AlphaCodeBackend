const request = require('supertest');
import app from '../app';

import db from '../models';
import User from '../models/User';
import Challenge from '../models/Challenge';
import generateToken from '../helpers/generateToken';
import { CREATED } from '../constants/status-codes';

const challengeBaseURL = '/api/v1/challenges';
const userData = {
  email: 'email@alpha.com',
  username: 'testcase',
  password: 'kfjkdfsdhfksdfdhf',
};
let token = '';
jest.setTimeout(30000);

describe('Challenge', () => {
  beforeAll(async () => {
    await db.connect();
    await User.create(userData);
    const user: any = await User.findByEmail(userData.email);
    token = generateToken({ _id: user._id, email: user.email });
  });

  it('should submit a challenge', async done => {
    const challenge = {
      functionName: 'getMaxValue',
      args: ['value1', 'value2', 'value3'],
      returnType: 'Number',
    };
    const { body } = await request(app)
      .post(`${challengeBaseURL}/submit`)
      .set('authorization', `${token}`)
      .send(challenge);
    expect(body.status).toEqual(CREATED);
    const { data } = body;
    expect(data.params).toEqual(challenge.args);
    expect(data.functionName).toEqual(challenge.functionName);
    expect(data.returnType).toEqual(challenge.returnType);
    done();
  });

  afterAll(async () => {
    await User.remove({ email: userData.email });
    await Challenge.deleteMany({});
    await db.disconnect();
  });
});
