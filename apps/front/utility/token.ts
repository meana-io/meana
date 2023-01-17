export const getToken = (name = 'token') => {
  try {
    const token = localStorage.getItem('token');
    return token;
  } catch {
    return '';
  }
};

export const setToken = (value: string, name = 'token') => {
  try {
    localStorage.setItem(name, value);
  } catch {
    // No empty line
  }
};

export const removeToken = (name = 'token') => {
  try {
    localStorage.removeItem('token');
  } catch {
    // No empty line
  }
};
