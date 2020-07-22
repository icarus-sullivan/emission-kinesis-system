import { wrapper, ApiError } from '@teleology/lambda-api';
import events from './ddb';

const handler = async ({ data }) => {
  if (!data.id) {
    throw new ApiError('An id is required to update this resource');
  }

  return events.update(data);
};

export default wrapper(handler);
