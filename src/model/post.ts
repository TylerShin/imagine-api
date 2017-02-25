import * as dynamoose from 'dynamoose';
import { SERVICE_NAME, POST_TABLE } from '../constants';

const Schema = dynamoose.Schema;

export const postSchema = new Schema({
  postId: {
    type: String,
    validate: function(value: string) { return value.length > 0; },
    hashKey: true,
    required: true,
  },
  content: {
    type: String,
    validate: function(value: string) { return value.length <= 15; },
  },
  resources: {
    type: [String],
    required: true,
  },
},
{
  timestamps: true
});

const Post = dynamoose.model(`${SERVICE_NAME}-${POST_TABLE}`, postSchema);

export default Post;
