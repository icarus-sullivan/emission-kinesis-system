/* eslint-disable camelcase */
import { v4 as uuid } from 'uuid';
import { wrapper } from '@teleology/lambda-api';
import hash from '../utils/hash';
import events from './ddb';

const handler = async ({ data }) => {
  const {
    event_type,
    v = '0.0.1',
    consumer_type = 'unimplemented',
    consumer_configuration = {},
    enabled = true,
  } = data;

  return events.create({
    id: uuid(),
    hid: hash(event_type),
    event_type,
    v,
    consumer_type,
    consumer_configuration,
    enabled,
  });
};

export default wrapper(handler);
