import * as LambdaProxy from "../../typings/lambda-proxy";
import * as URL from "url";

export default async function handler(event: LambdaProxy.Event): Promise<LambdaProxy.Response> {
  try {
    return {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      statusCode: 200,
      body: JSON.stringify("work!"),
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
