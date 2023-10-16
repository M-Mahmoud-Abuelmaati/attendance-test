export default {
  home: "/",
  login: "/auth/login",
  user: (id: string = ":id") => `/user/${id}`,
};
