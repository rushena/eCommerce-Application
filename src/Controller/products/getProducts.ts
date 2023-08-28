import { getApiRoot } from '../apiRoot/generalClient.ts';

function getSimpleProject() {
  return getApiRoot()
    .withProjectKey({
      projectKey: 'new-ecommerce-app',
    })
    .productProjections()
    .get()
    .execute();
}

export async function getProducts() {
  try {
    const project = await getSimpleProject();
    if (project.statusCode! >= 400) {
      return { body: null };
    } else {
      return project;
    }
  } catch {
    return { body: null };
  }
}
