import api from "./api"; // your axios instance

export const signupService = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const res = await api.post("/api/auth/signup", {
    name,
    email,
    password,
    role,
  });
  return res.data;
};

export const loginService = async (email: string, password: string) => {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data; // expect a JWT token here
};
