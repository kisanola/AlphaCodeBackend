import supertest from 'supertest';
import async from 'async';
import app from '../../app';

interface TestCaseInterface {
  input: object;
  output: object;
  message: string;
  method: string;
  url: string;
}
interface RoutesTestParams {
  url: string;
  cases: TestCaseInterface[];
  token?: string;
}

export const routesTest = ({ url, cases, token }: RoutesTestParams): void => {
  async.eachOfSeries(cases, async (testCase: TestCaseInterface) => {
    const { input, output, message, method } = testCase;
    test(`${message} ${JSON.stringify(input)}`, async () => {
      let request = supertest(app);
      if (token) {
        request = request.set('authorization', `${token}`);
      }

      const { body } = await request[method](url).send(input);

      expect(output).toEqual(body);
    });
  });
};
