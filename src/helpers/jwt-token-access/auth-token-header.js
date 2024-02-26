export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authFunStudnt"));

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken };
  } else {
    return {};
  }
}
