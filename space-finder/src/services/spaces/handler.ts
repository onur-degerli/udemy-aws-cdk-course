import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces } from "./DeleteSpaces";
import { JsonError, MissingFieldError } from "../shared/Validator";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

  let message: string;

  try {
    switch(event.httpMethod) {
      case 'GET':
        const getRespnse = getSpaces(event, ddbClient);
        return getRespnse;
      case 'POST':
        const postResponse = postSpaces(event, ddbClient);
        return postResponse;
      case 'PUT': 
        const putResponse = await updateSpaces(event, ddbClient);
        return putResponse;
      case 'DELETE': 
        const deleteResponse = await deleteSpaces(event, ddbClient);
        return deleteResponse;
      default: 
        break;
    }
  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message
      }
    }

    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message
      }
    }

    return {
      statusCode: 500,
      body: error.message
    }
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message)
  }

  return response;
}

export { handler }