import axios from 'axios';

import qs from 'qs';

import pkceChallenge from 'pkce-challenge';

import { Authentication } from './auth';

const authServer = axios.create({
  baseURL: 'http://localhost:8081',
});

authServer.interceptors.response.use(undefined, async (error) => {
  if (error?.response?.status === 401) {
    AuthService.imperativelySendToLogout();
  }

  return Promise.reject(error);
});

export default class AuthService {
  public static imperativelySendToLogout() {
    window.localStorage.clear();
    window.location.href = `http://localhost:8081/logout?redirect=http://localhost:3001`;
  }

  public static async getNewToken(config: {
    refreshToken: string;
    codeVerifier: string;
  }) {
    const formUrlEncoded = qs.stringify({
      refresh_token: config.refreshToken,
      code_verifier: config.codeVerifier,
      grant_type: 'refresh_token',
      client_id: 'alganews-cms',
    });

    return authServer
      .post<Authentication.OAuthAuthorizationTokenResponse>(
        '/oauth/token',
        formUrlEncoded,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => res.data);
  }

  public static async getFirstAccessToken(config: {
    code: string;
    codeVerifier: string;
    redirectUri: string;
  }) {
    const data = {
      code: config.code,
      code_verifier: config.codeVerifier,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
      client_id: 'alganews-cms',
    };

    const encodedData = qs.stringify(data);

    return authServer
      .post<Authentication.OAuthAuthorizationTokenResponse>(
        '/oauth/token',
        encodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => res.data);
  }

  public static getLoginScreenUrl(codeChallenge: string) {
    const config = qs.stringify({
      response_type: 'code',
      client_id: 'alganews-cms',
      redirect_uri: `${window.location.origin}/authorize`,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return `http://localhost:8081/oauth/authorize?${config}`;
  }

  public static async imperativelySendToLoginScreen() {
    const { code_challenge, code_verifier } = await pkceChallenge();

    this.setCodeVerifier(code_verifier);

    const loginUrl = this.getLoginScreenUrl(code_challenge);

    // imperativo, gera efeito colateral
    window.location.href = loginUrl;
  }

  public static getAccessToken() {
    return window.localStorage.getItem('accessToken');
  }

  public static setAccessToken(token: string) {
    return window.localStorage.setItem('accessToken', token);
  }

  public static getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  }

  public static setRefreshToken(refreshToken: string) {
    return window.localStorage.setItem('refreshToken', refreshToken);
  }

  public static getCodeVerifier() {
    return window.localStorage.getItem('codeVerifier');
  }

  public static setCodeVerifier(codeVerifier: string) {
    return window.localStorage.setItem('codeVerifier', codeVerifier);
  }
}
