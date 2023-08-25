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
      return { success: false };
    } else {
      return project;
    }
  } catch {
    return { success: false };
  }
}
