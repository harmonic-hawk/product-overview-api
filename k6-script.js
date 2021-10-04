/* eslint-disable */
import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 1 }, // below normal load
    { duration: '10s', target: 250 }, // normal load
    { duration: '10s', target: 500 }, // around breaking point
    { duration: '10s', target: 100 }, // beyond breaking point
    { duration: '10s', target: 20 }, // scale down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // errors are less than 1%,
    http_req_duration: ['p(95)<2000'], // 95% of requests should be under 2000
  },
};

export default () => {
  group('initial page load', () => {
    const MAX_PRODUCT_ID = 1000011;
    const randomProductId = Math.floor(Math.random() * MAX_PRODUCT_ID);

    const getProductById = http.get(`http://localhost:3000/products/${randomProductId}`);

    check(getProductById, {
      'is status 200': (r) => r.status === 200,
      'is duration < 2000ms': (r) => r.timings.duration < 2000,
    });

    sleep(1);

    const randomProductIdForStyles = Math.floor(Math.random() * MAX_PRODUCT_ID);

    const getStylesById = http.get(`http://localhost:3000/products/${randomProductIdForStyles}/styles`);

    check(getStylesById, {
      'is status 200': (r) => r.status === 200,
      'is duration < 2000ms': (r) => r.timings.duration < 2000,
    });
  });
};
