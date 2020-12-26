import { Schema, Model, model, Document } from 'mongoose';
import ChallengeTestCase, { ChallengeTestCaseI } from './ChallengeTestCase';

const ChallengeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  functionName: { type: String, required: true },
  params: { type: Array, required: true },
  returnType: { type: String, required: true },
  testCases: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ChallengeTestCase',
      },
    ],
  },
  status: {
    type: String,
    default: 'active',
  },
});

interface ChallengeI extends Document {
  functionName: string;
  params: Array<{ type: string; name: string }>;
  returnType: string;
  user: string;
  status: string;
  testCases: Array<ChallengeTestCaseI>;
  createdAt: Date;
  updatedAt: Date;
}

const Challenge: Model<ChallengeI> = model<ChallengeI>('Challenge', ChallengeSchema);

export default Challenge;
