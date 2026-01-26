import instance from "../Api"

export const login = (credentials) => {
  return instance.post('/auth/login', credentials);
}

export const signup = (credentials) => {
  return instance.post('/auth/signup', credentials);
}