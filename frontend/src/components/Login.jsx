import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input"; 
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../utils/apiRequest";
import { useAuth } from "../utils/authProvider";
import { Vortex } from './ui/vortex';
import { NavbarDemo } from "./NavbarDemo";

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
      login(); 
      navigate('/');
    } catch (error) {
      console.error('Could not log in:', error);
    }
  };

  return (
    <>
    
      <NavbarDemo/>
      <Vortex className=' z-10'>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl z-20 p-4 md:p-8 shadow-input bg-black relative">
        <h2 className="font-bold text-xl text-neutral-200">
          Welcome to Aceternity
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to Aceternity if you can because we don&apos;t have a login flow yet
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="projectmayhem@fc.com"
              type="email"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              type="password"
              required
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
      </Vortex>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {children}
    </div>
  );
};
