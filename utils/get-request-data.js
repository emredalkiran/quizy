export default function getRequestData(request = {}) {
  return Object.freeze({
    body: request.body,
    queryParams: request.query
  })
}