import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends cdk.StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends cdk.Stack {
  public readonly spacesLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props?: LambdaStackProps) {
    super(scope, id, props);

    const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
      runtime: Runtime.NODEJS_LATEST,
      handler: 'handler',
      entry: join(__dirname, '..', '..', 'services', 'spaces', 'handler.ts'),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
      tracing: Tracing.ACTIVE,
      timeout: cdk.Duration.minutes(1),
    });

    spacesLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.spacesTable.tableArn],
        actions: [
          'dynamodb:PutItem',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
      })
    );

    this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
  }
}
