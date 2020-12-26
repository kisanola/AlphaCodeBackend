import mongoose, { Schema, Model, Document } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: false,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.statics.findByEmail = async function(email: string): Promise<Document> {
  return this.findOne({ email });
};

interface UserDocumentInt extends Document {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  verified: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  findByEmail(email: string): Promise<Response>;
}

export interface UserModelInt extends Model<UserDocumentInt> {
  findByEmail(email: string): Promise<Response>;
}

const UserModel: UserModelInt = mongoose.model<UserDocumentInt, UserModelInt>('User', UserSchema);

export default UserModel;
