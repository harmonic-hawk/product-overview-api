/* eslint-disable */
import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 50 }, // below normal load
    { duration: '30s', target: 200 }, // normal load
    { duration: '30s', target: 300 }, // around breaking point
    { duration: '30s', target: 500 }, // beyond breaking point
    { duration: '15s', target: 50 }, // scale down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // errors are less than 1%,
    http_req_duration: ['p(95)<2000'], // 95% of requests should be under 2000
    http_reqs: ['rate>=100'], // load rate is greater than 100rps
  },
};

export default () => {
  group('initial page load', () => {
    const MAX_PRODUCT_ID = 1000011;
    const randomProductId = Math.floor(Math.random() * MAX_PRODUCT_ID);

    const getProductById = http.get(`http://localhost:5000/products/${randomProductId}`);

    check(getProductById, {
      'is status 200': (r) => r.status === 200,
      'is duration < 2000ms': (r) => r.timings.duration < 2000,
    });

    const randomProductIdForStyles = Math.floor(Math.random() * MAX_PRODUCT_ID);

    const getStylesById = http.get(`http://localhost:5000/products/${randomProductIdForStyles}/styles`);

    check(getStylesById, {
      'is status 200': (r) => r.status === 200,
      'is duration < 2000ms': (r) => r.timings.duration < 2000,
    });

     sleep(1);
  });
};
