export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { "Bearer Token": "token" };
  } else {
    return {};
  }
}
