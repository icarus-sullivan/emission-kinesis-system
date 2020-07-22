// const { pipeline } = require('../registry');
import { v4 as uuid } from 'uuid';
import { wrapper } from '@teleology/lambda-api';
import hash from '../utils/hash';
import events from './ddb';

const handler = async ({ data }) => {
  const { eventType, eventPayload, ...item } = data;

  return events.create({
    id: uuid(),
    hid: hash(eventType),
    eventType,
    eventPayload,
    ...item 
  });
};

export default wrapper(handler);
