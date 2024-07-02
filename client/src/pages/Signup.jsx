import React from "react";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Signup = () => {
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    // Debugging log
    console.log("Form Data:", {
      username,
      email,
      password,
    });
    try {
      toast.loading("Signing In", { id: "signup" });
      await auth?.signup(username, email, password);
      toast.success("Sign up Sucessfully", { id: "signup" });
    } catch (err) {
      toast.error("Unable to Signup", { id: "signup" });
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
          name="email"
          id="email"
          type="text"
          label="email"
          placeholder="enter your email"
        />
        <FormField
          name="password"
          id="password"
          type="password"
          label="password"
          placeholder="enter your password"
        />
        <button>Sumbit</button>
      </form>
    </>
  );
};

export default Signup;
