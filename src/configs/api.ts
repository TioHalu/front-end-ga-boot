const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const api = {
  login: baseUrl + 'v1/user/login',
  register: baseUrl + 'v1/user/register',
  getMember: baseUrl + 'v1/user/',
}

export default api;