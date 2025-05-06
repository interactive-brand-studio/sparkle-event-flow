
export const isUserLoggedIn = (): boolean => {
  return localStorage.getItem('userLoggedIn') === 'true';
};

export const loginUser = (): void => {
  localStorage.setItem('userLoggedIn', 'true');
};

export const logoutUser = (): void => {
  localStorage.removeItem('userLoggedIn');
};
