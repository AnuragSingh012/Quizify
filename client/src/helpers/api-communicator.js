import axios from "axios";
export const loginUser = async (username, password) => {
  const res = await axios.post("/user/login", {
    username,
    password,
  });
  if (res.status != 200) throw new Error("Unable to login");
  const data = await res.data;
  console.log(data);
  return data;
};

export const signupUser = async (username, email, password) => {
  const res = await axios.post("/user/signup", {
    username,
    email,
    password,
  });
  if (res.status != 200) throw new Error("Unable to signup");
  const data = await res.data;
  console.log(data);
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status != 200) throw new Error("Unable to Authenticate");
  const data = await res.data;
  console.log(data);
  return data;
};
