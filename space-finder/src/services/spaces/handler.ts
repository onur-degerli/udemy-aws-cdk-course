import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { postSpaces } from './PostSpaces';
import { getSpaces } from './GetSpaces';
import { updateSpaces } from './UpdateSpaces';
import { deleteSpaces } from './DeleteSpaces';
import { JsonError, MissingFieldError } from '../shared/Validator';
import { addCorsHeader } from '../shared/Utils';
import { captureAWSv3Client, getSegment } from 'aws-xray-sdk-core';

const ddbClient = captureAWSv3Client(new DynamoDBClient({}));

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;
  let response: APIGatewayProxyResult;

  const subSeg = getSegment().addNewSubsegment('MyLongCall');
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  subSeg.close();

  const subSeg2 = getSegment().addNewSubsegment('MyLongCall');
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  subSeg2.close();

  try {
    switch (event.httpMethod) {
      case 'GET':
        response = await getSpaces(event, ddbClient);
        break;
      case 'POST':
        response = await postSpaces(event, ddbClient);
        break;
      case 'PUT':
        response = await updateSpaces(event, ddbClient);
        break;
      case 'DELETE':
        response = await deleteSpaces(event, ddbClient);
        break;
      default:
        break;
    }
  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }

    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }

    return {
      statusCode: 500,
      body: error.message,
    };
  }

  addCorsHeader(response);

  return response;
}

export { handler };
