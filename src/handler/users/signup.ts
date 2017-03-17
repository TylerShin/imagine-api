import * as LambdaProxy from "../../typings/lambda-proxy";
import * as jwt from "jsonwebtoken";
import * as passwordHash from "password-hash";
import User from "../../model/user";
import * as uuid from "uuid";
import makeError from "../../helper/errorMaker";

interface ISignUpRequestBody {
  username: string;
  email: string;
  password: string;
  // Below are made by Server
  jwtToken?: string;
  id?: string;
}

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  const JWTKey: string = process.env.JWTKEY;
  if (!JWTKey) {
    return makeError(500, "You should set JWT Key");
  }

  let httpBody: ISignUpRequestBody | null = null;

  try {
    httpBody = JSON.parse(event.body || "");
  } catch (err) {
    return makeError(500, "Error on parsing JSONed HTTP body");
  }

  if (!httpBody) {
    return makeError(400, "You should post something");
  }

  const userParams: ISignUpRequestBody = {
    id: uuid.v1(),
    username: httpBody.username,
    email: httpBody.email,
    password: passwordHash.generate(httpBody.password),
  };

  const token = jwt.sign(userParams, JWTKey, {
    algorithm: 'HS512', //"HS256", "HS384", "HS512", "RS256", "RS384", "RS512" default SHA256
    expiresInMinutes: 1440 //expires in 24 hours
  } as jwt.SignOptions);

  // set JWT token
  userParams["jwtToken"] = token;

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
