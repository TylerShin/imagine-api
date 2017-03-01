import * as dynamoose from 'dynamoose';
import { SERVICE_NAME, USER_TABLE } from '../constants';

const Schema = dynamoose.Schema;

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
    index: true,
    rangeKey: true,
    validate: function (value: string) { return value.length <= 15; },
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
