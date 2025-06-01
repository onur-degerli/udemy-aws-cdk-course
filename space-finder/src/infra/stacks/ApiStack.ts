import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends cdk.StackProps {
  helloLambdaIntegration: LambdaIntegration
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'SpacesApi');
    const spacesResource = api.root.addResource('spaces');
    spacesResource.addMethod('GET', props.helloLambdaIntegration)
  }
}