import * as LambdaProxy from "../../typings/lambda-proxy";
// import * as jwt from "jsonwebtoken";
import * as passwordHash from "password-hash";
import User, { IUser } from "../../model/user";
import makeError from "../../helper/errorMaker";

interface ISignInRequestBody {
  username: string;
  password: string;
}

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  const JWTKey: string = process.env.JWTKEY;
  if (!JWTKey) {
    return makeError(500, "You should set JWT Key");
  }

  let httpBody: ISignInRequestBody | null = null;

  try {
    httpBody = JSON.parse(event.body || "");
  } catch (err) {
    return makeError(500, "Error on parsing JSONed HTTP body");
  }

  if (!httpBody) {
    return makeError(400, "You should post something");
  }

  const username = httpBody.username;
  const password = httpBody.password;

  if (!username || !password) {
    return makeError(401, "You should input username or password");
  }

  let userModel;
  let resultUser: IUser[] = [];
  await new Promise((resolve, reject) => {
    User.scan({ username: { eq: username } }, (err, user) => {
      if (err) {
        return makeError(500, `can not find user! ${err}`)
      }
      userModel = user;
      resultUser = JSON.parse(JSON.stringify(user));
      if (resultUser.length < 0) {
        return makeError(404, "There is no user");
      }
      resolve();
    });
  });

  // Verify password
  const userObj = resultUser[0];
  const verified = passwordHash.verify(password, userObj.password);
  if (!verified) {
    return makeError(401, "Wrong password");
  }

  // regenerate and update JWT


  return {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    statusCode: 200,
    body: JSON.stringify({ data: resultUser }),
  };
};
