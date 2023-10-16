export default {
  home: "/",
  login: "/auth/login",
  user: (id: string = ":id") => `/users/${id}`,
  userAdd: `/users/add`,
  userEdit: (id: string = ":id") => `/users/${id}/edit`,
  attendanceAdd: (id: string = ":id") => `/users/${id}/attendance/add`,
};
