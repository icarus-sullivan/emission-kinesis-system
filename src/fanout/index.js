/* eslint-disable camelcase */
import semver from 'semver';
import webhook from './webhook';
import lambda from './lambda';
import sms from './sms';
import unimplemented from './unimplemented';
import events from '../consumers/ddb';

const fanoutHandlers = {
  webhook,
  lambda,
  sms,
  '*': unimplemented,
};

const parseKinesisRecord = ({ kinesis }) => ({
  key: kinesis.partitionKey,
  ...JSON.parse(Buffer.from(kinesis.data, 'base64')),
});

const fanoutConsumer = async ({
  id,
  event_type,
  event_payload,
  consumer_type,
  consumer_configuration,
  enabled,
  version,
  v,
}) => {
  if (!enabled) return;
  if (!semver.satisfies(version, v)) return;
  try {
    console.log('fanoutConsumer', {
      id,
      event_type,
      event_payload,
      consumer_type,
      consumer_configuration,
      enabled,
    });

    await (fanoutHandlers[consumer_type] || fanoutHandlers['*'])({
      ...consumer_configuration,
      ...event_payload,
    });
  } catch (e) {
    console.error(
      JSON.stringify(
        {
          id,
          event_type,
          message: e.message,
          stack: e.stack,
        },
        null,
        2,
      ),
    );
  }
};

const fanoutEvent = async ({
  key,
  hash,
  version,
  event_type,
  event_payload,
}) => {
  try {
    const consumers = await events.query({
      hid: hash,
    });

    await Promise.all(
      consumers.map((cons) =>
        fanoutConsumer({
          ...cons,
          version,
          event_type,
          event_payload,
        }),
      ),
    );
  } catch (e) {
    console.error(
      'fanoutEvent',
      JSON.stringify(
        {
          id: key,
          hid: hash,
          event_type,
          message: e.message,
          stack: e.stack,
        },
        null,
        2,
      ),
    );
  }
};

export default async (evt) => {
  console.log('time', Date.now());
  console.log('evt', JSON.stringify(evt, null, 2));

  const records = (evt.Records || []).map(parseKinesisRecord);

  console.log('parsed', JSON.stringify(records, null, 2));

  await Promise.all(records.map(fanoutEvent));
};
