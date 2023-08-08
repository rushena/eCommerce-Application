import { getApiRoot } from './builClient.ts';
import { RegistrationOptions, AuthResponse } from './authTypes.ts';

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
function getProject(options: RegistrationOptions) {
  return getApiRoot()
    .withProjectKey({
      projectKey: 'new-ecommerce-app',
    })
    .customers()
    .post({
      body: {
        email: options.email,
        firstName: options.firstName,
        lastName: options.lastName,
        password: options.password,
      },
    })
    .execute();
}

// Retrieve Project information and output the result to the log
export async function registration(
  options: RegistrationOptions
): Promise<AuthResponse> {
  try {
    const project = await getProject(options);
    if (project.statusCode! >= 400) return { succes: false };
    return { succes: true };
  } catch {
    return { succes: false };
  }
}
