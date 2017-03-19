export default function (errorStatusCode: number, errorMessage: string) {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Expose-Headers": "Authorization",
      'Access-Control-Allow-Credentials': 'true',
      "content-type": "application/json; charset=utf-8",
    },
    statusCode: errorStatusCode,
    body: JSON.stringify(errorMessage),
  }
}
