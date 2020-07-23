/* eslint-disable camelcase */
import hash from '../utils/hash';

const { wrapper } = require('@teleology/lambda-api');
const { v4: uuid } = require('uuid');
const kinesis = require('../kinesis');

const stream = kinesis({ streamName: process.env.FIREHOSE_NAME });

const handler = async ({ data }) => {
  const { id = uuid(), type, payload } = data;

  // Split the type into an event_type and version
  const [event_type, version] = type.split('@');

  // Write to kinesis
  await stream.write({
    id,
    content: {
      hash: hash(event_type),
      event_type,
      version,
      event_payload: payload,
    },
  });

  return {
    statusCode: '200',
    body: '',
  };
};

export default wrapper(handler);
