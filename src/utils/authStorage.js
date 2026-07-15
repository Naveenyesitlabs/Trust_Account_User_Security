const AUTH_STORAGE_KEY = "trust-account";

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

export const getStoredSession = () => parseStoredValue(sessionStorage.getItem(AUTH_STORAGE_KEY));

export const storeAuthSession = (authData) => {
  const payload = JSON.stringify({
    ...authData?.userData,
    role: authData?.role,
  });

  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.setItem(AUTH_STORAGE_KEY, payload);
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
