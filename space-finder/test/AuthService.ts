import { Amplify } from "aws-amplify";
import { SignInOutput, fetchAuthSession, signIn } from '@aws-amplify/auth';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion = 'eu-north-1';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_LvYw226La',
      userPoolClientId: '5suef91kcmbgudt7ssa6s0lnr1',
      identityPoolId: 'eu-north-1:be8f69f2-02b9-4702-adce-a4a05ac6819c'
    }
  }
});

export class AuthService {
  public async login(userName: string, password: string): Promise<SignInOutput> {
    const signInOutput: SignInOutput = await signIn({
      username: userName,
      password: password,
      options: {
        authFlowType: 'USER_PASSWORD_AUTH'
      }
    });

    return signInOutput;
  }

  public async getIdToken() {
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
  }

  public async generateTemporaryCredentials() {
    const idToken = await this.getIdToken();
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/eu-north-1_LvYw226La`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: 'eu-north-1:be8f69f2-02b9-4702-adce-a4a05ac6819c',
        logins: {
          [cognitoIdentityPool]: idToken,
        }
      })
    });

    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}