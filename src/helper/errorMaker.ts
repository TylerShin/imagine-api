export default function (errorStatusCode: number, errorMessage: string) {
  return {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    statusCode: errorStatusCode,
    body: JSON.stringify(errorMessage),
  }
}
