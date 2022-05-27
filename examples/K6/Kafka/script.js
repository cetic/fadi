import { check } from 'k6';
import { writer, produce, reader, consume, createTopic } from 'k6/x/kafka';

const bootstrapServers = ['10.111.124.142:9092'];
const kafkaTopic = 'xk6_kafka_json_topic';

const producer = writer(bootstrapServers, kafkaTopic);
const consumer = reader(bootstrapServers, kafkaTopic);

createTopic(bootstrapServers[0], kafkaTopic);

function getRandomInt(max = 1000) {
  return Math.floor(Math.random() * max + 1);
}

export default function () {
  const messages = [
    {
      key: JSON.stringify({
        correlationId: 'test-id-sql-' + getRandomInt(),
      }),
      value: JSON.stringify({
        title: 'Load Testing SQL Databases with k6',
        url: 'https://k6.io/blog/load-testing-sql-databases-with-k6/',
        locale: 'en',
      }),
    },
    {
      key: JSON.stringify({
        correlationId: 'test-id-redis-' + getRandomInt(),
      }),
      value: JSON.stringify({
        title: 'Benchmarking Redis with k6',
        url: 'https://k6.io/blog/benchmarking-redis-with-k6/',
        locale: 'en',
      }),
    },
  ];

  const error = produce(producer, messages);
  check(error, {
    'is sent': (err) => err == undefined,
  });
}

export function teardown(data) {
  producer.close();
  consumer.close();
}