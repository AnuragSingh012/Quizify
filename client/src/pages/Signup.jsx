import { useEffect } from "react";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      return navigate("/");
    }
  }, [auth]);

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
          required={true}
        />
        <FormField
          name="email"
          id="email"
          type="text"
          label="email"
          placeholder="enter your email (anything@gmail.com)"
          inputClass="bg-gray-100 p-2 rounded-md"
          required={true}
        />
        <FormField
          name="password"
          id="password"
          type="password"
          label="password"
          placeholder="Create password (must be at least 6 characters)"
          inputClass="bg-gray-100 p-2 rounded-md"
          required={true}
        />
        <button className="mt-4 bg-black text-white py-2 rounded-md text-base font-semibold">
          Sumbit
        </button>
      </form>
    </div>
  );
};

export default Signup;
