import { getApiRoot } from '../generalClient.ts';

function getProject() {
  return getApiRoot()
    .withProjectKey({
      projectKey: 'new-ecommerce-app',
    })
    .productProjections()
    .get()
    .execute();
}

export async function tests(): Promise<{ succes: boolean }> {
  try {
    const project = await getProject();
    if (project.statusCode! >= 400) return { succes: false };
    return { succes: true };
  } catch {
    return { succes: false };
  }
}
