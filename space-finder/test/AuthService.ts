import { Amplify } from "aws-amplify";
import { SignInOutput, fetchAuthSession, signIn } from '@aws-amplify/auth';

const awsRegion = 'eu-north-1';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_LvYw226La',
      userPoolClientId: '5suef91kcmbgudt7ssa6s0lnr1'
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
}