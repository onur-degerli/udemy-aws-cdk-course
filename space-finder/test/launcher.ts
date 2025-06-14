import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = 'eu-north-1';
process.env.TABLE_NAME = 'SpaceStack-0a39509a9a59';

handler({
  httpMethod: 'GET',
  /* body: JSON.stringify({
    location: 'Dublin'
  }) */
} as any, {} as any);