export default function getRequestData(request = {}) {
  return {
    body: request.body,
    queryParams: request.query
  }
}