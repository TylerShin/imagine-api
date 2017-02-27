import * as LambdaProxy from "../../typings/lambda-proxy";
import Post from "../../model/post";
import makeError from "../../helper/errorMaker";

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  let targetPostId: string;

  if (!event.path && !event.query && Object.getOwnPropertyNames(event.path) && Object.getOwnPropertyNames(event.query)) {
    return makeError(500, "You should request with postId!");
  } else {
    targetPostId = event.path.id || event.query.id;
  }

  try {
    const post = await Post.get(targetPostId);
    if (!post) {
      return makeError(404, "There isn't Post with that id");
    }
    return {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      statusCode: 200,
      body: JSON.stringify({ data: post }),
    };
  } catch (e) {
    return makeError(500, "Has failed to get post from DynamoDB");
  }
};
