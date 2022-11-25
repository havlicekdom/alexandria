export interface PublicUser {
  id: string;
  username: string;
  email: string;
}

export interface ForgottenPasswordJwtToken {
  userId: string;
}
