import request from 'supertest';

import app from '../app';
import db from '../models';
import User from '../models/User';
import Challenge from '../models/Challenge';
import generateToken from '../helpers/generateToken';
import { CREATED, BAD_REQUEST } from '../constants/status-codes';

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

  it('should return bad request', async () => {
    const challenge = {
      params: [
        { type: 'integer', name: 'value1' },
        { type: 'integer', name: 'value2' },
      ],
      returnType: 'integer',
    };
    const res = await request(app)
      .post(`${challengeBaseURL}`)
      .set('authorization', `${token}`)
      .send(challenge);

    const { body } = res;

    expect(body.status).toEqual(BAD_REQUEST);
  });

  it('should return a new challenge', async () => {
    const challenge = {
      functionName: 'getMaxValue',
      params: [
        { type: 'integer', name: 'value1' },
        { type: 'integer', name: 'value2' },
      ],
      returnType: 'integer',
    };
    const res = await request(app)
      .post(`${challengeBaseURL}`)
      .set('authorization', `${token}`)
      .send(challenge);
    expect(res.body.status).toEqual(CREATED);
    const { data } = res.body;
    expect(data.params).toEqual(challenge.params);
    expect(data.functionName).toEqual(challenge.functionName);
    expect(data.returnType).toEqual(challenge.returnType);
  });

  afterAll(async () => {
    await User.deleteOne({ email: userData.email });
    await Challenge.deleteMany({});
    await db.disconnect();
  });
});
