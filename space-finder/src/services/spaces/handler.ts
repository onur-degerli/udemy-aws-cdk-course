import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";

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
      default: 
        break;
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message)
  }

  return response;
}

export { handler }