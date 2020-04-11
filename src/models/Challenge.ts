import { Schema, Model, model, Document } from 'mongoose';

const ChallengeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  functionName: { type: String, required: true },
  params: { type: Array, required: true },
  returnType: { type: String, required: true },
});

interface ChallengeI extends Document {
  functionName: string;
  params: string[];
  returnType: string;
  user: string;
  lastName?: string;
  avatar?: string;
  verified: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const Challenge: Model<ChallengeI> = model<ChallengeI>('Challenge', ChallengeSchema);

export default Challenge;
