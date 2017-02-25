import * as LambdaProxy from "../../typings/lambda-proxy";
import * as URL from "url";
const dynamoose = require('dynamoose');

// Create cat model with default options
var Posts = dynamoose.model('posts', { id: Number, name: String });

// Create a new cat object
var garfield = new Cat({id: 666, name: 'Garfield'});

// Save to DynamoDB
garfield.save();

// Lookup in DynamoDB
Cat.get(666)
.then(function (badCat) {
  console.log('Never trust a smiling cat. - ' + badCat.name);
});

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  try {
    return {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      statusCode: 200,
      body: JSON.stringify("work!"),
    };
  } catch (e) {
    return {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
