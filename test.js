import http from 'k6/http';
import { group } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const withPromisesAllDuration = new Trend('with_promises_all.duration', true);
const withoutPromisesAllDuration = new Trend('without_promises_all.duration', true);


const withPromisesAllSuccessRate = new Rate('with_promises_all.success_rate');
const withoutPromisesAllSuccessRate = new Rate('without_promises_all.success_rate');

const withPromisesAllErrorRate = new Rate('with_promises_all.error_rate');
const withoutPromisesAllErrorRate = new Rate('without_promises_all.error_rate');


export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 100 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 100 },
      ],
      gracefulRampDown: '0s',
    },
  },
};

export default function () {
    group('with promises all', () => {
        const res = http.get('http://localhost:3001/with/promises-all');
        withPromisesAllDuration.add(res.timings.duration);
        withPromisesAllSuccessRate.add(res.status == 200);
        withPromisesAllErrorRate.add(res.status > 200);
    });
    group('without promises all', () => {
        const res = http.get('http://localhost:3002/without/promises-all');
        withoutPromisesAllDuration.add(res.timings.duration);
        withoutPromisesAllSuccessRate.add(res.status == 200);
        withoutPromisesAllErrorRate.add(res.status > 200);
    });
}