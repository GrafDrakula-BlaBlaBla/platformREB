export const HOST_SUFFIX = 'reb-ufs/#';

export class Crutch {
  private DEV_HOST: string = 'reb-dev.rebplatform.ru';
  private TEST_HOST: string = 'reb-test.rebplatform.ru';
  private PROD_HOST: string = 'rebplatform.ru';

  getLoginURL(hostName: string = window.location.hostname): string {
    debugger;
    switch (hostName) {
      case this.DEV_HOST:
        return `${window.location.protocol}//${this.DEV_HOST}${this.getAuthURL(
          this.DEV_HOST + this.getPostFix(HOST_SUFFIX)
        )}`;
      case this.TEST_HOST:
        return `${window.location.protocol}//${this.TEST_HOST}${this.getAuthURL(
          this.TEST_HOST + this.getPostFix(HOST_SUFFIX)
        )}`;
      case this.PROD_HOST:
        return `${window.location.protocol}//auth.${
          this.PROD_HOST
        }${this.getAuthURL(this.PROD_HOST + this.getPostFix(HOST_SUFFIX))}`;
    }
    return window.location.origin;
  }

  getLogoutURL(hostName: string = window.location.hostname): string {
    switch (hostName) {
      case this.PROD_HOST:
        return `${window.location.protocol}//${hostName}/iam/openid-connect-auth/logout`;
      default:
        return `${window.location.protocol}//${hostName}/iam-admin-panel/openid-connect-auth/logout`;
    }
  }

  getPostFix(postfix: string): string {
    return `/${postfix}`;
  }

  getAuthURL(redirectPath: string): string {
    return `/auth/realms/RebAuth/protocol/openid-connect/auth?client_id=PlatformAuth-Proxy&redirect_uri=${window.location.protocol}//${redirectPath}/&response_type=code&scope=openid`;
  }
}

export default new Crutch();
