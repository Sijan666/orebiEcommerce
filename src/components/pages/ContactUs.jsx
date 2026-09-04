import React, { useState } from "react";
import Flex from "../Flex";
import Container from "../Container";
import { FaArrowRight } from "react-icons/fa";

const ContactUs = () => {
  // state to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted Successfully:", formData);
    alert("Thank you for your message!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Breadcrumb Section */}
      <Container className={'py-10 md:py-16 lg:py-[125px] px-4 lg:px-0'}>
        <h3 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-3 md:pb-5">
          Contacts
        </h3>
        <Flex className={'text-[12px] text-[#767676] gap-x-2 items-center'}>
          <a href="/" className="hover:text-black transition-colors duration-300">Home</a>
          <FaArrowRight />
          <p>Contacts</p>
        </Flex>
      </Container>
      {/* Contact Form Section */}
      <Container className={'pb-16 md:pb-[100px] lg:pb-[140px] px-4 lg:px-0'}>
        <h4 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-6 md:pb-10">
          Fill up a Form
        </h4>
        <form onSubmit={handleSubmit} className="w-full lg:w-[750px]">
          {/* Name Field */}
          <div className="mb-4 md:mb-6">
            <label htmlFor="name" className="block text-sm md:text-base font-bold text-[#262626] pb-2 md:pb-4">
              Name
            </label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name Here" 
              required
              className="pb-3 md:pb-4 outline-none w-full border-b border-[#F0F0F0] text-sm md:text-base focus:border-black transition-colors duration-300"
            />
          </div>
          {/* Email Field */}
          <div className="mb-4 md:mb-6">
            <label htmlFor="email" className="block text-sm md:text-base font-bold text-[#262626] pb-2 md:pb-4">
              Email
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email Here" 
              required
              className="pb-3 md:pb-4 outline-none w-full border-b border-[#F0F0F0] text-sm md:text-base focus:border-black transition-colors duration-300"
            />
          </div>
          {/* Message Field */}
          <div className="mb-8 md:mb-10">
            <label htmlFor="message" className="block text-sm md:text-base font-bold text-[#262626] pb-2 md:pb-4">
              Message
            </label>
            <textarea 
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here" 
              rows={4} 
              required
              className="pb-3 md:pb-4 outline-none w-full border-b border-[#F0F0F0] text-sm md:text-base resize-none focus:border-black transition-colors duration-300"
            ></textarea>
          </div>
          {/* Submit Button */}
          <button 
            type="submit" 
            className="cursor-pointer w-full md:w-auto bg-black text-white font-bold py-4 px-12 text-sm md:text-base hover:bg-[#262626] transition-colors duration-300"
          >
            Post
          </button>
        </form>
        {/* Map Section */}
        <div className="mt-16 md:mt-24">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.9730352447!2d90.33728817435122!3d23.78084055948969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1714413123456!5m2!1sen!2sus" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
            className="bg-gray-100"
          ></iframe>
        </div>
      </Container>
    </>
  );
}

export default ContactUs;