// @third-party
import { CognitoUserPool } from 'amazon-cognito-identity-js';

/***************************  AUTH CLIENT - AWS  ***************************/

export function createUserPool() {
  if (process.env.NEXT_PUBLIC_AWS_USER_POOL_ID && process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID) {
    return new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
      ClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID
    });
  } else {
    throw new Error('AWS User Pool ID and Web Client ID are required.');
  }
}
