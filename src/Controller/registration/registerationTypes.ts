interface SuccesAuthResponse {
  // I'm not sure what kind of info we gonna need in succes response
  success: true;
}

interface ErrorAuthResponse {
  success: false;
  errorMessage: string;
}

export type AuthResponse = SuccesAuthResponse | ErrorAuthResponse;
