import * as LambdaProxy from "../../typings/lambda-proxy";
import * as uuid from "uuid";
import Post from "../../model/post";
import errorMaker from "../../helper/errorMaker";

interface IWritePostHTTPBody {
  content: string;
  resources: [string];
}

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  let httpBody: IWritePostHTTPBody | null = null;

  try {
    httpBody = JSON.parse(event.body || "");
  } catch (err) {
    return errorMaker(500, "Error on parsing JSONed HTTP body");
  }

  if (!httpBody) {
    return errorMaker(400, "You should post something");
  } else if (httpBody.content.length > 15) {
    return errorMaker(400, "content shouldn't be more than 10 character");
  }

  try {
    const newPost = new Post({
      postId: uuid.v1(),
      content: httpBody.content || "",
      resources: httpBody.resources,
    });
    await newPost.save();
    return {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      statusCode: 200,
      body: JSON.stringify({ success: true }),
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
