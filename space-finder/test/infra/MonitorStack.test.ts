import { App } from 'aws-cdk-lib';
import { MonitorStack } from '../../src/infra/stacks/MonitorStack';
import { Capture, Match, Template } from 'aws-cdk-lib/assertions';

describe('Initial test suit', () => {
  let monitorStackTemplate: Template;

  beforeAll(() => {
    const testApp = new App({
      outdir: 'cdk.out',
    });

    const monitorStack = new MonitorStack(testApp, 'MonitorStack');
    monitorStackTemplate = Template.fromStack(monitorStack);
  });

  test('Lambda properties', () => {
    monitorStackTemplate.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
      Runtime: 'nodejs18.x',
    });
  });

  test('SNS topic properties', () => {
    monitorStackTemplate.hasResourceProperties('AWS::SNS::Topic', {
      DisplayName: 'AlarmTopic',
    });
  });

  test('SNS subscription properties', () => {
    monitorStackTemplate.hasResourceProperties(
      'AWS::SNS::Subscription',
      Match.objectEquals({
        Protocol: 'lambda',
        TopicArn: {
          Ref: Match.stringLikeRegexp('AlarmTopic'),
        },
        Endpoint: {
          'Fn::GetAtt': [Match.stringLikeRegexp('webHookLambda'), 'Arn'],
        },
      })
    );
  });

  test('SNS subscription properties - with exact values', () => {
    const snsTopic = monitorStackTemplate.findResources('AWS::SNS::Topic');
    const snsTopicName = Object.keys(snsTopic)[0];

    const lambdaTopic = monitorStackTemplate.findResources(
      'AWS::Lambda::Function'
    );
    const lambdaTopicName = Object.keys(lambdaTopic)[0];

    monitorStackTemplate.hasResourceProperties(
      'AWS::SNS::Subscription',
      Match.objectEquals({
        Protocol: 'lambda',
        TopicArn: {
          Ref: snsTopicName,
        },
        Endpoint: {
          'Fn::GetAtt': [lambdaTopicName, 'Arn'],
        },
      })
    );
  });

  test('Alarm actions', () => {
    const alarmActionCapture = new Capture();
    monitorStackTemplate.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmActions: alarmActionCapture,
    });

    expect(alarmActionCapture.asArray()).toEqual([
      {
        Ref: expect.stringMatching(/^AlarmTopic/),
      },
    ]);
  });

  test('Monitor stack snapshot', () => {
    expect(monitorStackTemplate.toJSON()).toMatchSnapshot();
  });

  test('Lambda stack snapshot', () => {
    const lambda = monitorStackTemplate.findResources('AWS::Lambda::Function');
    expect(lambda).toMatchSnapshot();
  });

  test('SNS stack snapshot', () => {
    const sns = monitorStackTemplate.findResources('AWS::SNS::Topic');
    expect(sns).toMatchSnapshot();
  });
});
