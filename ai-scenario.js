import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 5 },
    { duration: '30s', target: 10 },
    { duration: '20s', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<540'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const homeRes = http.get('https://test.k6.io');

  check(homeRes, {
    'home status 200': (r) => r.status === 200,
  });

  sleep(1);

  const newsRes = http.get('https://test.k6.io/news.php');

  check(newsRes, {
    'news status 200': (r) => r.status === 200,
  });

  sleep(1);
}
