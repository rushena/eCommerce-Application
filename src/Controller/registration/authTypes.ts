interface SuccesAuthResponse {
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
