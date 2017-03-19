import * as LambdaProxy from "../../typings/lambda-proxy";
import * as passwordHash from "password-hash";
import User, { IUser } from "../../model/user";
import * as uuid from "uuid";
import makeError from "../../helper/errorMaker";
import { getToken } from "../../helper/token";

interface ISignUpRequestBody {
  username: string;
  email: string;
  password: string;
  // Below are made by Server
  jwtToken?: string;
  id?: string;
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

  const userParams: IUser = {
    id: uuid.v1(),
    username: httpBody.username,
    email: httpBody.email,
    password: passwordHash.generate(httpBody.password),
  };

  // set JWT token
  userParams["jwtToken"] = getToken(userParams);

  const newUser = new User(userParams);

  try {
    await newUser.save();
  } catch (err) {
    return makeError(500, err);
  }

  return {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    statusCode: 200,
    body: JSON.stringify({ data: newUser }),
  };
};
