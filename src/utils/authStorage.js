const AUTH_STORAGE_KEY = "trust-account";
const REMEMBERED_EMAIL_KEY = "trust-account-email";

const parseStoredValue = (value) => {
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const getStoredSession = () =>
  parseStoredValue(sessionStorage.getItem(AUTH_STORAGE_KEY)) ||
  parseStoredValue(localStorage.getItem(AUTH_STORAGE_KEY));

export const storeAuthSession = (authData, rememberMe = false) => {
  // alert(JSON.stringify(authData?.userData, null, 2));

  // let filteredData = {};

  // if (authData?.userData) {
  //   const {
  //     stripe_customer_id,
  //     phone,
  //     ...rest
  //   } = authData.userData;

  //   filteredData = rest;
  // }

  const payload = JSON.stringify({
    ...authData?.userData,
    role: authData?.role,
  });

  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
  const targetStorage = rememberMe ? localStorage : sessionStorage;
  targetStorage.setItem(AUTH_STORAGE_KEY, payload);
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
};