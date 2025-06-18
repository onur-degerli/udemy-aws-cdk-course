import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  console.log('test');
  if (event.queryStringParameters && ('id' in event.queryStringParameters)) {
    const spaceId = event.queryStringParameters['id'];

    await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        'id': {S: spaceId}
      }
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(`Delete spaces with id: ${spaceId}`)
    }
  }

  return {
    statusCode: 204,
    body: JSON.stringify('Please provide the right args!')
  }
}