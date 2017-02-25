import * as LambdaProxy from "../../typings/lambda-proxy";
import Post from "../../model/post";

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  try {
    const newPost = new Post({
      content: "less 10",
      resources: ["https://images.vingle.net/upload/t_ca_xl/wanhqbpjpgrwevqx9fn2.jpg"],
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
