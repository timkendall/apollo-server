import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

const queries = [
  {
    name: 'hello',
    query: '{ foo }',
  },
];

export let options = {
  // A number specifying the number of Virtual Users to run concurrently
  vus: 50,
  // sampling duration
  duration: '30s',
  // enable to debug
  // httpDebug: 'full',
  // A boolean, true or false, specifying whether k6 should disable keep-alive connections
  noConnectionReuse: true,
  noVUConnectionReuse: true,

  // used for errors
  thresholds: {
    errors: ['rate<0.05'], // <5% errors
  },
};

export default function() {
  for (const query of queries) {
    const url = 'http://localhost:9001';
    const payload = JSON.stringify({ query: query.query });
    const params = { headers: { 'Content-Type': 'application/json' } };
    const res = http.post(url, payload, params);

    check(res, {
      'Status was 200': r => r.status == 200,
      'It returns HelloWorld': r => r.body == 'Hello World!',
    }) || errorRate.add(1);
  }
}
