import { wrapper } from '@teleology/lambda-api';
import events from './ddb';
import hash from '../utils/hash';

const handler = async ({ data }) => {
  if (data.event_type) {
    return events.query({
      hid: hash(data.event_type),
    });
  }

  if (data.hash) {
    return events.query({
      hid: data.hash,
    });
  }

  return [];
};

export default wrapper(handler);
