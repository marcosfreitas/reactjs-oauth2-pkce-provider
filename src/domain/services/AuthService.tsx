// inpired by gardner/react-oauth2-pkce
// add auth service class

// add tokens contract
// add provider response contract
// add auth error response contract

// add auto refresh based on the expires time, if enabled

import { AuthServiceProps } from '@app/domain/contracts/AuthServiceProps';
import PKCE from 'js-pkce';
import ITokenResponse from 'js-pkce/dist/ITokenResponse';

/**
 * @deprecated
 */
export interface JWTIDToken {
  given_name: string;
  family_name: string;
  name: string;
  email: string;
}
/**
 * @deprecated
 */
export interface TokenRequestBody {
  clientId: string;
  grantType: string;
  redirectUri?: string;
  refresh_token?: string;
  clientSecret?: string;
  code?: string;
  codeVerifier?: string;
}

export class AuthService {
  props: AuthServiceProps;
  pkce: PKCE;

  constructor(props: AuthServiceProps) {
    this.props = props;
    this.pkce = new PKCE({
      client_id: this.props.clientId,
      redirect_uri: this.props.redirectUrl,
      authorization_endpoint: this.props.authorizationUrl,
      token_endpoint: this.props.accessTokenUrl,
      requested_scopes: this.props.requestedScopes,
      storage: this.props.storage,
    });

    this.pkce
      .exchangeForAccessToken(window.location.href)
      .then((r: ITokenResponse) => {
        console.log('exchange response', r);
        // @todo updates current url?
      })
      .catch((e) => {
        // @todo clear local storage?
        console.warn({ e });
      });

    // @todo add auto refresh
  }
}
