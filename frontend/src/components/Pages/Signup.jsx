import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../../utils/apiRequest"; // Assuming you have a signup API function
import { useAuth } from "../../utils/authProvider";
import { Vortex } from "../ui/vortex";
import { NavbarDemo } from "../NavbarDemo";
import { toast } from "react-hot-toast"; // Import the toast function
import GoogleAuthButton from "./GoogleAuthButton";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await registerAPI({ name, email, password });
      console.log("Sign up successful", response);
      localStorage.setItem("token", response.token);
      login(response.token);
      toast.success("Sign up successful! Redirecting...");
      navigate("/");
    } catch (error) {
      console.error("Could not sign up:", error);
      toast.error("Could not sign up. Please try again.");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
        {/* <NavbarDemo className="mb-4" /> */}
        <Vortex className="mt-20 pt-10 z-10">
          <div className="mx-auto rounded-lg dark:border md:mt-0 w-9/12 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="shadow flex max-sm:flex-col-reverse  gap-10 shadow-violet-400 p-6 space-y-4 md:space-y-6 sm:p-8 bg-clip-padding backdrop-filter backdrop-blur-xl  bg-white/10 bg-opacity-30 rounded-lg text-white p-10  mx-auto ">
              <div className="left w-1/2 max-sm:w-full">
              <h1 className="text-4xl font-semibold mb-5"><span className="text-violet-400">Zen</span>Zone</h1>
              <h1 className="text-lg font-medium mb-4 leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6 text-black"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-white/30 text-black rounded-lg outline-none  focus:outline-violet-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-black"
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white/30 text-black rounded-lg outline-none focus:outline-violet-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-black"
                    placeholder="name@company.com"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white/30 text-black rounded-lg outline-none focus:outline-violet-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-white/30  text-black rounded-lg outline-none focus:outline-violet-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 checked:bg-violet-400 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-violet-400 hover:underline dark:text-violet-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                  onSubmit={handleSubmit}
                >
                  Sign up
                </button>
                <div className="flex items-center w-full justify-center my-6">
                  <hr className="w-1/2 bg-gray-50" />
                  <span className="px-2 text-gray-500 text-xs ">OR</span>
                  <hr className="w-1/2 bg-gray-50" />
                </div>
                
                <GoogleAuthButton text={"Sign up with Google"}/>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-violet-400 hover:underline dark:text-violet-300"
                  >
                    Login
                  </a>
                </p>
              </form>
              </div>
              <div className="w-1/2 max-sm:w-full max-sm:h-[150px] flex justify-center ">
                <img className="object-cover rounded-lg" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb6c8ee7-953e-4132-8a70-f7df09b6fa8e/dey3pb8-e86d3b07-bb73-4db9-87a5-950f6b866c76.png/v1/fill/w_1280,h_1600,q_80,strp/zenmode__by_mrscreativemind_dey3pb8-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMCIsInBhdGgiOiJcL2ZcL2ZiNmM4ZWU3LTk1M2UtNDEzMi04YTcwLWY3ZGYwOWI2ZmE4ZVwvZGV5M3BiOC1lODZkM2IwNy1iYjczLTRkYjktODdhNS05NTBmNmI4NjZjNzYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.dPsappzRtB7HE3IC2tgEPzBg5wyqYNznB2trof0TCf8" alt="" />
              </div>
            </div>
          </div>
        </Vortex>
      </div>
    </>

  );
}

export default SignupForm;