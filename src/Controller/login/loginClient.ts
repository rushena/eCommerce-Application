import { getApiRoot } from '../apiRoot/builClient.ts';
import { AuthResponse } from './loginTypes.ts';

function getProject(login: string, password: string) {
  const request = getApiRoot()
    .withProjectKey({
      projectKey: 'new-ecommerce-app',
    })
    .me()
    .login()
    .post({ body: { password: password, email: login } })
    .execute();
  return request;
}

export async function authentication(
  login: string,
  password: string
): Promise<AuthResponse> {
  try {
    const project = await getProject(login, password);
    if (project.statusCode! >= 400) return { succes: false };
    // write customer id into cookie once customer signed up
    document.cookie = `userID=${project.body.customer.id}; max-age=172000; path=/;`;
    return { succes: true, token: project.body.customer.id };
  } catch (error) {
    console.error(error);
    return { succes: false };
  }
}

// authentication('test5@gmail.com', '123456');
