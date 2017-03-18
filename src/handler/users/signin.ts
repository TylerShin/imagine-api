import * as LambdaProxy from "../../typings/lambda-proxy";
// import * as jwt from "jsonwebtoken";
import * as passwordHash from "password-hash";
import User from "../../model/user";
import makeError from "../../helper/errorMaker";

interface ISignInRequestBody {
  username: string;
  email: string;
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
  const email = httpBody.email;
  const password = passwordHash.generate(httpBody.password);

  if ((!username && !email) || !password) {
    return makeError(401, "You should input username or password");
  }

  let user;
  await new Promise((resolve, reject) => {
    console.log(username);
    try {
      if (email) {
        User.queryOne({ email: { eq: email } }, (err, user) => {
          user = user;
          resolve();
        });
      } else if (username) {
        User.get({ username }, (err, user) => {
          console.log(user);
          user = user;
          resolve();
        });
      }
    } catch (err) {
      reject(makeError(404, `${JSON.stringify(err)} There is no signed user.`));
    }
  });

  return {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    statusCode: 200,
    body: JSON.stringify({ data: user }),
  };
};
