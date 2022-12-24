import {Crutch, HOST_SUFFIX} from '../index';

const VERIFY_LoginURL = {
  PROD: `http://auth.rebplatform.ru/auth/realms/RebAuth/protocol/openid-connect/auth?client_id=PlatformAuth-Proxy&redirect_uri=http://rebplatform.ru/${HOST_SUFFIX}/&response_type=code&scope=openid`,
  DEV: `http://reb-dev.rebplatform.ru/auth/realms/RebAuth/protocol/openid-connect/auth?client_id=PlatformAuth-Proxy&redirect_uri=http://reb-dev.rebplatform.ru/${HOST_SUFFIX}/&response_type=code&scope=openid`,
  TEST: `http://reb-test.rebplatform.ru/auth/realms/RebAuth/protocol/openid-connect/auth?client_id=PlatformAuth-Proxy&redirect_uri=http://reb-test.rebplatform.ru/${HOST_SUFFIX}/&response_type=code&scope=openid`,
};

enum VERIFY_LogoutURL {
  PROD = 'http://rebplatform.ru/iam/openid-connect-auth/logout',
  OTHER = 'http://reb-dev.rebplatform.ru/iam-admin-panel/openid-connect-auth/logout',
}

enum HOSTS {
  DEV = 'reb-dev.rebplatform.ru',
  TEST = 'reb-test.rebplatform.ru',
  PROD = 'rebplatform.ru',
}

describe('TEST CRUTCH', () => {
  const crutch = new Crutch();

  it('Crutch getLoginURL PROD', () => {
    const loginURL = crutch.getLoginURL(HOSTS.PROD);
    console.log('PROD', loginURL);
    expect(loginURL).toEqual(VERIFY_LoginURL.PROD);
    expect(loginURL).toEqual(expect.stringContaining('auth.' + HOSTS.PROD));
  });

  it('Crutch getLoginURL TEST', () => {
    const loginURL = crutch.getLoginURL(HOSTS.TEST);
    console.log('TEST', loginURL);
    expect(loginURL).toEqual(VERIFY_LoginURL.TEST);
  });

  it('Crutch getLoginURL DEV', () => {
    const loginURL = crutch.getLoginURL(HOSTS.DEV);
    console.log('DEV', loginURL);
    expect(loginURL).toEqual(VERIFY_LoginURL.DEV);
  });

  it('Crutch getLogoutURL PROD', () => {
    const logoutURL = crutch.getLogoutURL(HOSTS.PROD);
    expect(logoutURL).toEqual(VERIFY_LogoutURL.PROD);
  });

  it('Crutch getLogoutURL', () => {
    const logoutURL = crutch.getLogoutURL(HOSTS.DEV);
    expect(logoutURL).toEqual(VERIFY_LogoutURL.OTHER);
  });
});
