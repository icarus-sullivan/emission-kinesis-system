const parseKinesisRecord = ({ kinesis }) => ({
  key: kinesis.partitionKey,
  ...JSON.parse(Buffer.from(kinesis.data, 'base64')),
});

export default async (evt) => {
  console.log('time', Date.now());
  console.log('evt', JSON.stringify(evt, null, 2));

  const records = (evt.Records || []).map(parseKinesisRecord);

  // console.log('parsed', JSON.stringify(records, null, 2));

  return {
    statusCode: '200',
    body: '',
  };
};