import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../utils/apiRequest";
import { useAuth } from "../../utils/authProvider";
import { Vortex } from "../ui/vortex";
import { NavbarDemo } from "../NavbarDemo";
import GoogleAuthButton from "./GoogleAuthButton";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); 
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
    console.log(formData);

    const { email, password } = formData;

    if (!email || !password) {
      console.error("Please fill all fields");
      return;
    }

    try {
      const response = await loginAPI({ email, password });
      console.log("Login successful", response);
      localStorage.setItem("token", response.token);
      login(response.token);
      navigate("/");
    } catch (error) {
      console.error("Could not log in:", error);
      setError(error.message || "An error occurred. Please try again."); 
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
        {/* <NavbarDemo className="mb-4" /> */}
        <Vortex className="mt-20 pt-10 z-10">
          <div className="mx-auto rounded-lg dark:border md:mt-0 w-9/12 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="shadow flex max-sm:flex-col-reverse gap-10 shadow-violet-400 p-6 space-y-4 md:space-y-6 sm:p-8 bg-clip-padding backdrop-filter backdrop-blur-xl  bg-white/10 bg-opacity-30 rounded-lg text-white p-10  mx-auto ">
            <div className="w-1/2 max-sm:w-full" >
            <h1 className="text-4xl font-semibold mb-5"><span className="text-violet-400">Zen</span>Zone</h1>
            <h1 className="text-lg mb-4 font-medium leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
                Login to your account
              </h1>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="  block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white/30 text-black rounded-lg outline-none focus:outline-violet-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
                  Login
                </button>
                <div className="flex items-center w-full justify-center my-6">
                  <hr className="w-1/2 bg-gray-50" />
                  <span className="px-2 text-gray-500 text-xs ">OR</span>
                  <hr className="w-1/2 bg-gray-50" />
                </div>
                
                <GoogleAuthButton text={"Log in with Google"}/>
                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/register"
                    className="font-medium text-violet-400 hover:underline dark:text-violet-300"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
            <div className="w-1/2 max-sm:w-full max-sm:h-[150px] flex justify-center">
              <img className="rounded-lg object-cover max-sm:object-center" src="https://cdn.pixabay.com/photo/2023/06/26/15/27/stones-8090026_1280.jpg" alt="" />
            </div>
            </div>
          </div>
        </Vortex>
      </div>
    </>
  );
}

export default LoginForm
