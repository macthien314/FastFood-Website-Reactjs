const  axiosClient  = require("../../api/axios");

export const requestAuthRegister = (data) => {
  return axiosClient.post("/auth/register", {
    ...data,
  });
};
export const requestAuthLogin = (data) => {
  return axiosClient.post("/auth/login", {
    ...data,
  });
};
export const requestAuthFetchMe = (token) => {
  if (!token) return;
  return axiosClient.get("/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return axiosClient.post("/token", {
    "Content-Type": "Application/json",
    refreshToken: token,
  });
};
