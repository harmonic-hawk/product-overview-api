import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 1 }, // below normal load
    { duration: '10s', target: 10 }, // normal load
    { duration: '10s', target: 250 }, // around breaking point
    { duration: '10s', target: 150 }, // beyond breaking point
    { duration: '10s', target: 20 }, // scale down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // errors are less than 1%,
    http_req_duration: ['p(95)<5000'], // 95% of requests should be under 5000
  },
};

export default function () {
  const res = http.get('http://localhost:3000/products');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
