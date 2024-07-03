import React from "react";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

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
    <div>
      <form
        className="flex flex-col gap-2 mt-16 max-w-md m-auto"
        onSubmit={handleSubmit}
      >
        <FormField
          name="username"
          id="username"
          type="text"
          label="Username"
          placeholder="enter your username"
          inputClass="bg-gray-100 p-2 rounded-md"
          required="true"
        />
        <FormField
          name="password"
          id="password"
          type="password"
          label="password"
          placeholder="enter your password"
          inputClass="bg-gray-100 p-2 rounded-md"
          required="true"
        />
        <button className="mt-4 bg-black text-white py-2 rounded-md text-base font-semibold">
          submit
        </button>
      </form>
      <div className="flex justify-center items-center gap-2 max-w-md m-auto mt-4">
        <p>Don't have an account?</p>
        <Link className="font-medium text-blue-500" to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
