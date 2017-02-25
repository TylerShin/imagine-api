import * as dynamoose from 'dynamoose';
const Schema = dynamoose.Schema;

export const postSchema = new Schema({
  id: {
    type: String,
    validate: function(value: number) { return value > 0; },
    hashKey: true,
    required: true,
  },
  content: {
    type: String,
    validate: function(value: number) { return value < 10; },
  },
  resources: {
    type: [String],
    required: true,
  },
},
{
  timestamps: true
});

const Post = dynamoose.model('posts', postSchema);

export default Post;
