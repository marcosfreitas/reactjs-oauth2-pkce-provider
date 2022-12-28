export interface AuthServiceProps {
  clientId: string;
  clientSecret: string;
  contentType: string;
  location: string;
  authorizationUrl: string;
  accessTokenUrl: string;
  redirectUrl: string;
  requestedScopes: string; // @bug can't be string[] due to js-pkce limitation
  storage: Storage;
  //autorefresh
}
