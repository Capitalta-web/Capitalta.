// @next
import { NextResponse } from 'next/server';

// @third-party
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import axios from 'axios';

// @project
import { AuthRole } from '@/enum';
import { createUserPool } from '@/utils/auth-client/aws';

const userPool = createUserPool();

/***************************  AWS - LOGIN  ***************************/

export async function login(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Create a CognitoUser instance for the user
    const user = new CognitoUser({
      Username: body.email,
      Pool: userPool
    });

    // Create authentication details with the provided email and password
    const authDetails = new AuthenticationDetails({
      Username: body.email,
      Password: body.password
    });

    // Authenticate the user using Cognito's `authenticateUser` method
    const session = await new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (session) => resolve(session),
        onFailure: (err) => reject(err)
      });
    });

    // Extract the access token and id from the authenticated session
    const accessToken = session.getAccessToken().getJwtToken();
    const id = session.getAccessToken().decodePayload().sub;

    // Respond with user details and the access token
    return NextResponse.json(
      {
        id,
        email: body.email,
        contact: '123456789', // Placeholder contact
        dialcode: '+91', // Placeholder dial code
        firstname: 'Bob', // Placeholder first name
        lastname: 'Dylan', // Placeholder last name
        access_token: accessToken // Access token from the session
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  AWS - GET USER  ***************************/

export async function getUser(token) {
  try {
    const region = process.env.NEXT_PUBLIC_AWS_REGION;

    // Configure headers for the Cognito API request
    const config = {
      headers: {
        'Content-Type': 'application/x-amz-json-1.0',
        Authorization: `Bearer ${token}`,
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser'
      }
    };

    // Make a POST request to Cognito's GetUser endpoint
    const response = await axios.post(`https://cognito-idp.${region}.amazonaws.com`, { AccessToken: token }, config);

    let userDetails = {};

    // Process the response if user attributes are available
    if (response?.data?.UserAttributes?.length > 0) {
      const data = await response.data.UserAttributes.reduce((acc, attr) => {
        acc[attr.Name] = attr.Value; // Map attribute names to their values
        return acc;
      }, {});

      // Map the retrieved data to a structured user details object
      userDetails = {
        id: data.sub, // Unique user ID
        email: data.email, // User email address
        role: AuthRole.USER, // User role (default: USER)
        contact: '123456789', // Placeholder for contact information
        dialcode: '+1', // Placeholder for dial code
        firstname: 'John', // Placeholder for first name
        lastname: 'Charly' // Placeholder for last name
      };
    }

    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error) && error.response) {
      // The request was made and the server responded with an error
      return NextResponse.json({ error: error.response.data.message || error.response.statusText }, { status: 400 });
    } else if (error instanceof Error) {
      // Something happened while setting up the request
      return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
    } else {
      // Unexpected error case
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

/***************************  AWS - SIGN UP  ***************************/

export async function signUp(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Initiate the sign-up process using the Cognito User Pool
    await new Promise((resolve, reject) => {
      /*
       * Notes:
       * - Currently, custom attributes are not being used, so an empty array is passed.
       *   To enable custom attributes, you must add them to Amazon Cognito.
       *   For more details, refer to the documentation: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes.
       */

      // userPool.signUp(body.email, body.password,[
      //   new CognitoUserAttribute({ Name: 'custom:firstname', Value: body.firstname }),
      //   new CognitoUserAttribute({ Name: 'custom:lastname', Value: body.lastname }),
      //   new CognitoUserAttribute({ Name: 'custom:dialcode', Value: body.dialcode }),
      //   new CognitoUserAttribute({ Name: 'custom:contact', Value: body.contact }),
      //   new CognitoUserAttribute({ Name: 'custom:role', Value: AuthRole.USER, }),
      // ], [], (err, result) => {})

      userPool.signUp(
        // User's email address
        body.email, // User's password
        body.password, // Array of user attributes (commented out for now)
        [], // Validation data (if any)
        [],
        (err, result) => {
          if (err) {
            reject(err);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error('Something went wrong!')); // Handle unexpected case
          }
        }
      );
    });

    // Success
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || 'Server error' }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

/***************************  AWS - VERIFY OTP  ***************************/

export async function verifyOtp(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Create a CognitoUser instance for the user
    const user = new CognitoUser({ Username: body.email, Pool: userPool });

    // Verify the OTP using Cognito's confirmRegistration method
    await new Promise((resolve, reject) => {
      user.confirmRegistration(body.otp, true, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    // Success
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || 'Server error' }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

/***************************  AWS - RESEND OTP  ***************************/

export async function resend(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Create a CognitoUser instance for the user
    const user = new CognitoUser({
      Username: body.email,
      Pool: userPool
    });

    // Resend the confirmation code using Cognito's resendConfirmationCode method
    await new Promise((resolve, reject) => {
      user.resendConfirmationCode((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    // Success
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || 'Server error' }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

/***************************  AWS - FORGOT PASSWORD  ***************************/

export async function forgotPassword(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Create a CognitoUser instance for the user
    const user = new CognitoUser({ Username: body.email, Pool: userPool });

    // Trigger the forgot password process using Cognito's forgotPassword method
    await new Promise((resolve, reject) => {
      user.forgotPassword({
        onSuccess: (data) => resolve(data),
        onFailure: (err) => reject(err)
      });
    });

    // Success
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || 'Server error' }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

/***************************  AWS - RESET PASSWORD  ***************************/

export async function resetPassword(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Create a CognitoUser instance for the user
    const user = new CognitoUser({
      Username: body.email,
      Pool: userPool
    });

    // Reset the password using Cognito's confirmPassword method
    await new Promise((resolve, reject) => {
      user.confirmPassword(body.otp, body.password, {
        onSuccess: () => resolve(),
        onFailure: (err) => reject(err)
      });
    });

    // Success
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || 'Server error' }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

/***************************  AWS - SIGN OUT  ***************************/

export async function signOut() {
  try {
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Export as a single object for easy import
const awsAuth = { login, getUser, signUp, verifyOtp, resend, forgotPassword, resetPassword, signOut };

export default awsAuth;
