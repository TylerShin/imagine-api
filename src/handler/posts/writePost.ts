import * as LambdaProxy from "../../typings/lambda-proxy";
import * as uuid from "uuid";
import Post from "../../model/post";
import makeError from "../../helper/errorMaker";

interface IWritePostHTTPBody {
  content: string;
  resources: [string];
  userId: string;
}

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  let httpBody: IWritePostHTTPBody | null = null;

  try {
    httpBody = JSON.parse(event.body || "");
  } catch (err) {
    return makeError(500, "Error on parsing JSONed HTTP body");
  }

  if (!httpBody) {
    return makeError(400, "You should post something");
  } else if (httpBody.content.length > 15) {
    return makeError(400, "content shouldn't be more than 10 character");
  }

  try {
    const newPost = new Post({
      Id: uuid.v1(),
      userId: httpBody.userId,
      content: httpBody.content || "",
      resources: httpBody.resources,
    });
    await newPost.save();
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "Authorization",
        'Access-Control-Allow-Credentials': 'true',
        "content-type": "application/json; charset=utf-8",
      },
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (e) {
    return makeError(500, e);
  }
};
