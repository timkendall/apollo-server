import { HttpRequest } from 'uWebSockets.js'
import { Request, Headers } from 'apollo-server-env';


export function convertNodeHttpToRequest(req: HttpRequest): Request {
  const headers = new Headers();


  // https://github.com/uNetworking/uWebSockets.js/blob/master/examples/Headers.js

  req.forEach((k, v) => {
    if (Array.isArray(v))
      v.forEach(value => headers.append(k, value));
    else 
      headers.append(k, v);
  });

  return new Request(req.getQuery(), {
    headers,
    method: req.getMethod().toUpperCase(),
  });
}
