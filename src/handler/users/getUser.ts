import * as LambdaProxy from "../../typings/lambda-proxy";
import User, { IUser } from "../../model/user";
import { getUserFromToken } from "../../helper/token";
import makeError from "../../helper/errorMaker";

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  const token = event.headers.Authorization;

  if (!token) {
    return makeError(403, "You don't have login token");
  }

  let user: IUser;
  try {
    user = getUserFromToken(token);
  } catch (err) {
    return makeError(403, "wrong or expired session");
  }


  let fetchedUser;
  await new Promise((resolve, reject) => {
    User.get({ id: user.id, username: user.username }, (err, userModel) => {
      if (err) {
        console.error(err);
        reject();
        return makeError(404, `Couldn't find user, ${err}`)
      }
      fetchedUser = JSON.parse(JSON.stringify(userModel));
      delete fetchedUser["password"];
      resolve();
    });
  });


  return {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    statusCode: 200,
    body: JSON.stringify({ data: fetchedUser }),
  };

};
