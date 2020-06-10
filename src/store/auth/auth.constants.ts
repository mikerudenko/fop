export const SERVER_ERROR_CODES = {
  userNotFound: 'auth/user-not-found',
  wrongPassword: 'auth/wrong-password',
};

export const AUTH_ERROR_NOTIFICATIONS = {
  [SERVER_ERROR_CODES.userNotFound]: 'Користувача не знайдено',
  [SERVER_ERROR_CODES.wrongPassword]: 'Невірний пароль',
};
