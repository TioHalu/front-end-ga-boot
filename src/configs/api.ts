const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const api = {
  login: baseUrl + "v1/user/login",
  register: baseUrl + "v1/user/register",
  getMember: baseUrl + "v1/user/",
  overview: baseUrl + "v1/overview/",
  gitlab: baseUrl + "v1/gitlab/",
  user: baseUrl + "v1/user",
  deployment: baseUrl + "v1/deployment",
};

export default api;
