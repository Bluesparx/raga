import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input"; 
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../utils/apiRequest"; // Assuming you have a signup API function
import { useAuth } from "../utils/authProvider";
import { Vortex } from './ui/vortex';
import { NavbarDemo } from "./NavbarDemo";

export function SignupFormDemo() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
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
    
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      console.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await registerAPI({ email, password });
      console.log('Sign up successful', response);
      localStorage.setItem('token', response.token); 
      login(); 
      navigate('/home');
    } catch (error) {
      console.error('Could not sign up:', error);
    }
  };

  return (
    <>
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <NavbarDemo className='mb-4'/>
      <Vortex className='mt-20 pt-10 z-10'>
      
      <div className="w-full bg-black mx-auto rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="shadow shadow-violet-400 p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Your email</label>
                      <input
                          type="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-200 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                          className="bg-gray-50 border border-gray-300 text-gray-200 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={handleChange}
                      />
                  </div>
                  <div>
                      <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Confirm Password</label>
                      <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-200 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-violet-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                  </p>
              </form>
          </div>
      </div>
      </Vortex>
      </div>
    </>
  );
}
