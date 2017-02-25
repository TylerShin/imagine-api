const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

export const postSchema = new Schema({
  id: {
    type: Number,
    validate: function(value: number) { return value > 0; },
    hashKey: true,
    required: true,
  },
  content: {
    type: String,
  },
  resources: {
    type: [String],
    required: true,
  },
},
{
  timestamps: true
});
