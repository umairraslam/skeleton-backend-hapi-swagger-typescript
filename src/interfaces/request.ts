import * as Hapi from "hapi";

export interface Credentials extends Hapi.AuthCredentials {
  id: string;
}

export interface RequestAuth extends Hapi.RequestAuth {
  credentials: Credentials;
}

export interface Request extends Hapi.Request {
  auth: RequestAuth;
}