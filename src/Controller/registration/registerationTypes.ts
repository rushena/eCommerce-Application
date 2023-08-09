interface SuccesAuthResponse {
  // I'm not sure what kind of info we gonna need in succes response
  succes: true;
  firstName?: string;
  lastName?: string;
  token?: string;
}

interface ErrorAuthResponse {
  succes: false;
  firstName?: string;
  lastName?: string;
  token?: string;
}

export interface RegistrationOptions {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  billing?: string;
  shipping?: string;
}

export type AuthResponse = SuccesAuthResponse | ErrorAuthResponse;
