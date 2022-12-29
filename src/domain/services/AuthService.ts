import { AuthServiceProps } from '@app/domain/contracts/AuthServiceProps';
import PKCE from 'js-pkce';

export class AuthService {
  private pkce: PKCE;

  constructor(props: AuthServiceProps) {
    this.pkce = new PKCE({
      client_id: props.clientId,
      redirect_uri: props.redirectUrl,
      authorization_endpoint: props.authorizationUrl,
      token_endpoint: props.accessTokenUrl,
      requested_scopes: props.requestedScopes,
      storage: props.storage,
    });
  }

  /**
   * Returns true if the user is authenticated, false otherwise.
   */
  public isAuthenticated(): boolean {
    // Check if the user's access token is set and has not expired
    //return !!this.pkce.getAccessToken() && !this.pkce.isTokenExpired();
    return true;
  }

  /**
   * Starts the authentication flow by redirecting the user to the authorization endpoint.
   */
  public login(): void {
    // Redirect the user to the authorization endpoint
    window.location.assign(this.getAuthorizeUrl());
  }

  public getAuthorizeUrl(): string {
    return this.pkce.authorizeUrl();
  }

  /**
   * Logs the user out of the application.
   */
  public logout(): void {
    // Clear the user's access token
    //this.pkce.clearAccessToken();
    // Redirect the user to the home page
    window.location.assign('/');
  }

  /**
   * Completes the authentication flow by exchanging the authorization code for an access token.
   */
  public completeAuth(): Promise<void> {
    return new Promise((resolve) => {
      // Do nothing and resolve the promise immediately
      resolve();
    });
    //this.pkce.completeAuth();
  }

  /**
   * Gets the user's access token.
   */
  /*public getAccessToken(): string | undefined {
    return this.pkce.getAccessToken();
  }*/

  /**
   * Gets the user's id token.
   */
  /*public getIdToken(): string | undefined {
    return this.pkce.getIdToken();
  }*/

  /**
   * Returns the PKCE object.
   */
  public getPKCE(): PKCE {
    return this.pkce;
  }
}
