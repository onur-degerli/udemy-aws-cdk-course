import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../Utils';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { join } from 'path';
import { existsSync } from 'fs';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { AccessLevel, Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';

export class UiDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    const deploymentBucket = new Bucket(this, 'uiDeploymentBucket', {
      bucketName: `space-finder-frontend-${suffix}`,
    });

    const uiDir = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'space-finder-frontend',
      'dist'
    );
    if (!existsSync(uiDir)) {
      console.warn('UI directory not found: ' + uiDir);
    }

    new BucketDeployment(this, 'SpacesFinderDeployment', {
      destinationBucket: deploymentBucket,
      sources: [Source.asset(uiDir)],
    });

    const s3Origin = S3BucketOrigin.withOriginAccessControl(deploymentBucket, {
      originAccessLevels: [AccessLevel.READ],
    });

    const distribution = new Distribution(this, 'SpacesFinderDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: s3Origin,
      },
    });

    new cdk.CfnOutput(this, 'SpaceFInderUrl', {
      value: distribution.distributionDomainName,
    });
  }
}
