const { wrapper } = require('@teleology/lambda-api');
const { v4: uuid } = require('uuid');
const kinesis = require('../kinesis');

const stream = kinesis({ streamName: process.env.FIREHOSE_NAME });

export default wrapper( async ({ data }) => {
  const { id = uuid(), eventType, eventPayload } = data;

  // Write to kinesis
  await stream.write({
    id,
    content: { type, payload },
  });

  return {
    statusCode: '200',
    body: '',
  };
});