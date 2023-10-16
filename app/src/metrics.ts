import { Counter, Histogram } from 'prom-client';

// API 호출 횟수를 수집할 Counter 메트릭
export const getWithSleepCounter = new Counter({
  name: 'get_with_sleep_calls_total',
  help: 'Total number of get-with-sleep endpoint calls',
});

// API 응답 시간을 수집할 Histogram 메트릭
export const getWithSleepDurationHistogram = new Histogram({
  name: 'get_with_sleep_duration_seconds',
  help: 'Duration of get-with-sleep endpoint calls',
  buckets: [0.1, 0.5, 1, 2, 5], // 예: <0.1s, <0.5s, <1s, <2s, <5s, >5s
});
