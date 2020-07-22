import { wrapper, ApiError } from '@teleology/lambda-api';
import events from './ddb';

const handler = async ({ data }) => {
  if (!data.hash) {
    throw new ApiError('Hash field required');
  }

  return events.query({
    hid: data.hash,
  });
};

export default wrapper(handler);
