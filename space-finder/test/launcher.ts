import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = 'eu-north-1';
process.env.TABLE_NAME = 'SpaceStack-0a39509a9a59';

handler({
  httpMethod: 'GET',
  queryStringParameters: {
    id: '8d3dee85-5a19-4a68-9eeb-9e8fbbecfac1'
  }
  /* body: JSON.stringify({
    location: 'Dublin'
  }) */
} as any, {} as any);