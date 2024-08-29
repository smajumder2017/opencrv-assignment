interface ILoginRequest {
  email: string;
  password: string;
}

interface IAuthTokenPayload {
  id: string;
  name: string;
  email: string;
}
