import * as LambdaProxy from "../../typings/lambda-proxy";
import User from "../../model/user";
import * as uuid from "uuid";
import makeError from "../../helper/errorMaker";

interface ISignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  let httpBody: ISignUpRequestBody | null = null;

  try {
    httpBody = JSON.parse(event.body || "");
  } catch (err) {
    return makeError(500, "Error on parsing JSONed HTTP body");
  }

  if (!httpBody) {
    return makeError(400, "You should post something");
  }

  try {
    const newUser = new User({
      id: uuid.v1(),
      username: httpBody.username,
      email: httpBody.email,

    });

    return {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      statusCode: 200,
      body: JSON.stringify({ data: newUser }),
    };
  } catch (e) {
    return makeError(500, "Has failed to get post from DynamoDB");
  }
};
