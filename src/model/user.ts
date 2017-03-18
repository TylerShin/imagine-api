import * as dynamoose from 'dynamoose';
import { SERVICE_NAME, USER_TABLE } from '../constants';

const Schema = dynamoose.Schema;

export interface IUser {
  id: string;
  jwtToken: string;
  username: string;
  email: string;
  password: string;
  followersCount: number;
  followingsCount: number;
  lastActionAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema = new Schema({
  id: {
    type: String,
    validate: function (value: string) { return value.length > 0; },
    hashKey: true,
    required: true,
  },
  jwtToken: {
    type: String,
  },
  username: {
    type: String,
    hashKey: true,
    required: true,
    validate: function (value: string) { return value.length <= 15; },
  },
  email: {
    type: String,
    hashKey: true,
    required: true,
    validate: function (value: string) { return value.length <= 30; },
  },
  password: {
    type: String,
    required: true,
  },
  followersCount: {
    type: Number,
    default: 0,
  },
  followingsCount: {
    type: Number,
    default: 0,
  },
  lastActionAt: {
    type: Date,
  },
},
  {
    timestamps: true
  });

const User = dynamoose.model(`${SERVICE_NAME}-${USER_TABLE}`, userSchema);

export default User;
