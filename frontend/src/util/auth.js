import { redirect } from "react-router-dom";
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  console.log("storedExpirationDate", storedExpirationDate);
  const expirationDate = new Date(storedExpirationDate);
  console.log("expirationDate", expirationDate);
  const now = new Date();
  console.log("now", now);
  const duration = expirationDate.getTime() - now.getTime();
  console.log("duration", duration);
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
