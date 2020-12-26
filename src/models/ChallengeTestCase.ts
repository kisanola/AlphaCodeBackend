import { Schema, Model, model, Document } from 'mongoose';

const ChallengeTestCaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  challenge: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
  },
  inputs: {
    type: String,
    required: true,
    get: (data: string): string => {
      if (typeof data === 'string') return data;
      return JSON.parse(data);
    },
    set: (data: string | Array<string>): string => {
      if (typeof data !== 'object') return data;
      return JSON.stringify(data);
    },
  },
  output: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

export interface ChallengeTestCaseI extends Document {
  user: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChallengeTestCase: Model<ChallengeTestCaseI> = model<ChallengeTestCaseI>(
  'ChallengeTestCase',
  ChallengeTestCaseSchema,
);

export default ChallengeTestCase;
