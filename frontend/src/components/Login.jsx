import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../utils/apiRequest";
import { useAuth } from "../utils/authProvider";
import { Vortex } from './ui/vortex';
import { NavbarDemo } from "./NavbarDemo";
import GoogleAuthButton from "./GoogleAuthButton";

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    console.log(formData);

    const { email, password } = formData;

    if (!email || !password) {
      console.error("Please fill all fields");
      return;
    }

    try {
      const response = await loginAPI({ email, password });
      console.log('Login successful', response);
      localStorage.setItem('token', response.token);
      login(response.token);
      navigate('/');
    } catch (error) {
      console.error('Could not log in:', error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <NavbarDemo className='mb-4' />
        <Vortex className='mt-20 pt-10 z-10'>

          <div className="w-full mx-auto rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="shadow shadow-violet-400 p-6 space-y-4 md:space-y-6 sm:p-8 bg-clip-padding backdrop-filter backdrop-blur-xl  bg-white/10 bg-opacity-30 rounded-lg text-white p-10 max-w-lg mx-auto ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white/30 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white/30 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-violet-400 hover:underline dark:text-violet-300">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Login</button>

                <div className="flex items-center w-full my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500 font-semibold">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex justify-center">
                  <GoogleAuthButton />
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="/register" className="font-medium text-violet-400 hover:underline dark:text-violet-300">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </Vortex>
      </div>
    </>
  );
}