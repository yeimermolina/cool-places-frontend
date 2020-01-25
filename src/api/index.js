import request from "./axios";
export const users = {
  signup: (name, email, password) =>
    request.post("/users/signup", {
      email,
      password,
      name
    }),
  login: (email, password) =>
    request.post("/users/login", {
      email,
      password
    }),
  list: () => request("/users")
};
