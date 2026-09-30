import React from "react";
import Container from "../Container";
import Flex from "../Flex";
import { FaArrowRight, FaBullseye, FaHistory, FaAward } from "react-icons/fa";
import Images from "../Images";
import about1 from '../../assets/about1.png';
import about2 from '../../assets/about2.png';
import Button from "../Button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="font-sans pb-10" id="about">
      {/* Breadcrumb */}
      <div className="bg-[#F5F5F3] py-10 md:py-16">
        <Container className="px-4 lg:px-0">
          <h1 className="text-3xl md:text-5xl text-[#262626] font-bold mb-4">About Orebi</h1>
          <Flex className="text-sm text-[#767676] gap-x-3 items-center font-medium">
            <Link to="/" className="hover:text-[#262626] transition-colors">Home</Link>
            <FaArrowRight className="text-xs" />
            <span className="text-[#262626]">About Us</span>
          </Flex>
        </Container>
      </div>
      {/* Hero */}
      <Container className="py-16 md:py-24 px-4 lg:px-0 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl lg:text-[42px] leading-snug text-[#262626] font-bold mb-6">
          Redefining the <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-black">e-commerce experience</span> for the modern world.
        </h2>
        <p className="text-base md:text-lg text-[#767676] leading-relaxed">
          Orebi is one of the world’s leading ecommerce brands, internationally recognized for celebrating the essence of classic worldwide style. We bring you top-tier products with an uncompromising commitment to quality.
        </p>
      </Container>
      {/* Image */}
      <Container className="pb-20 md:pb-32 px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <div className="relative group overflow-hidden rounded-2xl shadow-xl">
            <Images imgSrc={about1} className="w-full h-full md:max-h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
            <Button btnText="Our Brands" className="absolute bottom-8 left-8 py-3 px-8 text-sm font-semibold rounded-full shadow-lg"/>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-xl lg:mt-16">
            <Images imgSrc={about2} className="w-full h-full md:max-h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
            <Button btnText="Our Stores" className="absolute bottom-8 left-8 py-3 px-8 text-sm font-semibold rounded-full shadow-lg"/>
          </div>
        </div>
      </Container>
      {/* Brand Stats */}
      <div className="bg-black text-white py-16 mb-20 md:mb-32">
        <Container className="px-4 lg:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-gray-800 py-10">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">50+</h3>
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-3">Global Brands</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">10k</h3>
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-3">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">99%</h3>
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-3">Positive Feedback</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">24/7</h3>
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-3">Customer Support</p>
            </div>
          </div>
        </Container>
      </div>
      {/* Values */}
      <Container className="pb-10 px-4 lg:px-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#262626]">Who We Are</h2>
          <p className="text-[#767676] mt-4 max-w-2xl mx-auto text-base">Discover the principles that drive us to deliver the best shopping experience every single day.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vision */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 border border-gray-100 group">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-2xl text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <FaBullseye />
            </div>
            <h4 className="text-2xl font-bold text-[#262626] mb-4">Our Vision</h4>
            <p className="text-[#767676] leading-relaxed text-[15px]">
              To become the world's most customer-centric platform, where people can discover premium products with unparalleled ease and confidence.
            </p>
          </div>
          {/* Story */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 border border-gray-100 group">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-2xl text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <FaHistory />
            </div>
            <h4 className="text-2xl font-bold text-[#262626] mb-4">Our Story</h4>
            <p className="text-[#767676] leading-relaxed text-[15px]">
              Started as a vision for better retail, Orebi has grown into a global marketplace. Our journey is fueled by passion, innovation, and an unwavering commitment to our users.
            </p>
          </div>
          {/* Quality */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 border border-gray-100 group">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-2xl text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <FaAward />
            </div>
            <h4 className="text-2xl font-bold text-[#262626] mb-4">Top Quality</h4>
            <p className="text-[#767676] leading-relaxed text-[15px]">
              We partner exclusively with premium brands that meet our rigorous standards for quality, sustainability, and ethical manufacturing processes.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;