import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = 'eu-north-1';
process.env.TABLE_NAME = 'SpaceStack-0a39509a9a59';

const requestType: string = 'POST';

if (requestType === 'GET_ALL') {
  handler({
    httpMethod: 'GET'
  } as any, {} as any);
} else if (requestType === 'GET') {
  handler({
    httpMethod: 'GET',
    queryStringParameters: {
      id: '8d3dee85-5a19-4a68-9eeb-9e8fbbecfac1'
    }
  } as any, {} as any);
} else if (requestType === 'POST') {
  handler({
    httpMethod: 'POST',
    body: JSON.stringify({
      location: 'Dublin updated'
    })
  } as any, {} as any).then(result =>{
    console.log(result)
  });
} else if (requestType === 'PUT') {
  handler({
    httpMethod: 'PUT',
    queryStringParameters: {
      id: 'de2b2180-757d-44e7-b5a8-2a385b65f547'
    },
    body: JSON.stringify({
      location: 'Malmo'
    })
  } as any, {} as any);
} else if (requestType === 'DELETE') {
  handler({
    httpMethod: 'DELETE',
    queryStringParameters: {
      id: '8cd06869-d29e-4816-98f7-2f7d95abcb46'
    }
  } as any, {} as any);
}