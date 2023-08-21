interface SuccesAuthResponse {
  // I'm not sure what kind of info we gonna need in succes response
  success: true;
  token: string;
}
interface ErrorAuthResponse {
  success: false;
}

export type AuthResponse = SuccesAuthResponse | ErrorAuthResponse;

export type User = { username: string; password: string };
