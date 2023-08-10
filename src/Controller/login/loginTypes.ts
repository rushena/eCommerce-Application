interface SuccesAuthResponse {
  // I'm not sure what kind of info we gonna need in succes response
  succes: true;
  firstName?: string;
  lastName?: string;
  token: string;
}
interface ErrorAuthResponse {
  succes: false;
}

export type AuthResponse = SuccesAuthResponse | ErrorAuthResponse;

export type User = { username: string; password: string };
