import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com"; 

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFormLoaded(true);
    }, 200); // Delay for the fade-in effect
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Basic validation
    setErrors({
      ...errors,
      [name]: value.length === 0 ? `${name} is required` : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (formData.name && formData.email && formData.message) {
      // Use EmailJS to send the email
      emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "YOUR_USER_ID" // Replace with your EmailJS user ID
      ).then(() => {
        toast.success("Message sent successfully!"); 
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }).catch(() => {
        toast.error("Failed to send message. Please try again later."); 
      });
    } else {
      toast.error("Please fill out all the fields.");
    }
  };

  return (
           
    <div
      className={`flex flex-col items-center justify-center w-full max-w-lg mx-auto rounded-lg shadow-lg bg-white/10 bg-opacity-30 backdrop-filter backdrop-blur-xl md:p-8 p-6 space-y-4 md:space-y-6`}
    >
      <h1 className="text-3xl font-bold text-center mb-6 md:text-4xl">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="relative">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-3 rounded-md bg-white/30 border border-gray-600 text-white focus:ring-1 focus:ring-purple-300 focus:outline-none"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-3 rounded-md bg-white/30 border border-gray-600 text-white focus:ring-1 focus:ring-purple-300 focus:outline-none"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full p-3 rounded-md bg-white/30 border border-gray-600 text-white focus:ring-1 focus:ring-purple-300 focus:outline-none min-h-[100px] md:min-h-[150px]"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
          />
          {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 text-base w-full font-semibold md:w-auto md:flex md:items-center md:justify-center md:space-x-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
