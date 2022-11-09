/**
 * Inspired by bpedroza/js-pkce
 * @url https://raw.githubusercontent.com/bpedroza/js-pkce/master/src/PKCE.ts
 * @license MIT <https://github.com/bpedroza/js-pkce/blob/master/LICENSE.txt>
 *
 */
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import WordArray from 'crypto-js/lib-typedarrays';

//  import IAuthResponse from './IAuthResponse';
//  import IConfig from './IConfig';
//  import IObject from './IObject';
//  import ITokenResponse from './ITokenResponse';

import { AuthServiceProps } from '@app/domain/contracts/AuthServiceProps';

/**
 * @deprecated
 */
export class PKCE {
  private authService: AuthServiceProps;
  private state = '';
  private codeVerifier = '';

  /**
   * Initialize the instance with configuration
   * @param {AuthServiceProps} authService
   */
  constructor(authService: AuthServiceProps) {
    this.authService = authService;
  }

  /**
   * Generate the URL for the authorization request
   * @param  {Record<string, string>} additionalParams include additional parameters in the query
   * @return string
   */
  public mountAuthorizationUrl(
    additionalParams: Record<string, string> = {},
  ): string {
    const codeChallenge = this.pkceChallengeFromVerifier();

    const queryString = new URLSearchParams(
      Object.assign(
        {
          response_type: 'code',
          client_id: this.authService.clientId,
          state: this.getState(additionalParams.state || null),
          scope: this.authService.requestedScopes,
          redirect_uri: this.authService.redirectUrl,
          code_challenge: codeChallenge,
          code_challenge_method: 'S256',
        },
        additionalParams,
      ),
    ).toString();

    return `${this.authService.authorizationUrl}?${queryString}`;
  }

  /**
   * Given the return url, get a token from the oauth server
   * @param  url current url with params from server
   * @param  {object} additionalParams include additional parameters in the request body
   * @return {Promise<ITokenResponse>}
   */
  public exchangeForAccessToken(
    url: string,
    additionalParams: IObject = {},
  ): Promise<ITokenResponse> {
    return this.parseAuthResponseUrl(url).then((q) => {
      return fetch(this.authService.accessTokenUrl, {
        method: 'POST',
        body: new URLSearchParams(
          Object.assign(
            {
              grant_type: 'authorization_code',
              code: q.code,
              client_id: this.authService.clientId,
              redirect_uri: this.authService.redirectUrl,
              code_verifier: this.getCodeVerifier(),
            },
            additionalParams,
          ),
        ),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }).then((response) => response.json());
    });
  }

  /**
   * Get the current codeVerifier or generate a new one
   * @return {string}
   */
  private getCodeVerifier(): string {
    if (this.codeVerifier === '') {
      this.codeVerifier = this.randomStringFromStorage('pkce_code_verifier');
    }

    return this.codeVerifier;
  }

  /**
   * Get the current state or generate a new one
   * @return {string}
   */
  private getState(explicit: string = null): string {
    const stateKey = 'pkce_state';

    if (explicit !== null) {
      this.getStore().setItem(stateKey, explicit);
    }

    if (this.state === '') {
      this.state = this.randomStringFromStorage(stateKey);
    }

    return this.state;
  }

  /**
   * Get the query params as json from a auth response url
   * @param  {string} url a url expected to have AuthResponse params
   * @return {Promise<IAuthResponse>}
   */
  private parseAuthResponseUrl(url: string): Promise<IAuthResponse> {
    const params = new URL(url).searchParams;

    return this.validateAuthResponse({
      error: params.get('error'),
      query: params.get('query'),
      state: params.get('state'),
      code: params.get('code'),
    });
  }

  /**
   * Generate a code challenge
   * @return {Promise<string>}
   */
  private pkceChallengeFromVerifier(): string {
    const hashed = sha256(this.getCodeVerifier());
    return Base64.stringify(hashed)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  /**
   * Get a random string from storage or store a new one and return it's value
   * @param  {string} key
   * @return {string}
   */
  private randomStringFromStorage(key: string): string {
    const fromStorage = this.getStore().getItem(key);
    if (fromStorage === null) {
      this.getStore().setItem(key, WordArray.random(64));
    }

    return this.getStore().getItem(key) || '';
  }

  /**
   * Validates params from auth response
   * @param  {AuthResponse} queryParams
   * @return {Promise<IAuthResponse>}
   */
  private validateAuthResponse(
    queryParams: IAuthResponse,
  ): Promise<IAuthResponse> {
    return new Promise<IAuthResponse>((resolve, reject) => {
      if (queryParams.error) {
        return reject({ error: queryParams.error });
      }

      if (queryParams.state !== this.getState()) {
        return reject({ error: 'Invalid State' });
      }

      return resolve(queryParams);
    });
  }

  /**
   * Get the storage (sessionStorage / localStorage) to use, defaults to sessionStorage
   * @return {Storage}
   */
  private getStore(): Storage {
    return this.authService?.storage || sessionStorage;
  }
}
