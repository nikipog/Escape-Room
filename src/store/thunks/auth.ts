import type { User } from '../../types/user';
import { Endpoint } from '../../const';
import { dropToken, saveToken } from '../../services/token';
import { createAppAsyncThunk } from '../../hooks/store';


// для проверки пользователя

const checkAuth = createAppAsyncThunk<User, undefined>
('auth/checkAuth', async (_arg, { extra: api }) => {
  const response = await api.get<User>(Endpoint.Login);
  return response.data;
});

interface LoginData {
  email: string;
  password: string;
}

// для авторизации

const login = createAppAsyncThunk<User, LoginData>
('auth/login', async (body, { extra: api }) => {
  const response = await api.post<User>(Endpoint.Login, body);
  //сохраняем токен при успешной авторизации
  saveToken(response.data.token);
  return response.data;
});

// для выхода

const logout = createAppAsyncThunk<unknown, undefined>
('auth/logout', async (_, { extra: api }) => {
  await api.delete(Endpoint.Logout);
  //сбрасываем токен при выходе из хранилища
  dropToken();
});

export { checkAuth, login, logout };
