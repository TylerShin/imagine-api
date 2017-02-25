import * as dynamoose from 'dynamoose';
import { SERVICE_NAME, POST_TABLE } from '../constants';

const Schema = dynamoose.Schema;

export const postSchema = new Schema({
  postId: {
    type: String,
    validate: function (value: string) { return value.length > 0; },
    hashKey: true,
    required: true,
    index: true,
  },
  userId: {
    type: String,
    index: true,
    required: true,
  },
  content: {
    type: String,
    validate: function (value: string) { return value.length <= 15; },
  },
  resources: {
    type: [String],
    required: true,
  },
  emotionsCount: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String]
  },
},
  {
    timestamps: true
  });

const Post = dynamoose.model(`${SERVICE_NAME}-${POST_TABLE}`, postSchema);

export default Post;
