import React from "react";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    // Debugging log
    console.log("Form Data:", {
      username,
      password,
    });
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(username, password);
      toast.success("Signed in Sucessfully", { id: "login" });
    } catch (err) {
      toast.error("Unable to login", { id: "login" });
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormField
          name="username"
          id="username"
          type="text"
          label="Username"
          placeholder="enter your username"
        />
        <FormField
          name="password"
          id="password"
          type="password"
          label="password"
          placeholder="enter your password"
        />
        <button>submit</button>
      </form>
    </>
  );
};

export default Login;
