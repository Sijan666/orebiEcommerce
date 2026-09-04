import React from 'react';
import Container from "../Container";
import Images from "../Images";
import Logo from '../../assets/Logo.png';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerCategories = [
        "Smartphones", 
        "Laptops", 
        "Furniture", 
        "Mens Shirts", 
        "Womens Dresses"
    ];

return (
    <footer className="bg-[#F5F5F3] pt-20 pb-8 mt-20 font-sans border-t border-gray-200">
        <Container className="px-4 lg:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-gray-200">
                {/* brand & contact */}
                <div className="lg:col-span-4 flex flex-col gap-6 lg:pr-10">
                    <Link to="/" className="inline-block" aria-label="Go to Home">
                        <Images imgSrc={Logo} alt="Orebi Logo" className="w-28 object-contain" />
                    </Link>
                    <p className="text-sm text-[#555555] leading-relaxed mt-2">
                        Orebi is a premium e-commerce platform offering the best products with top-tier customer service. Quality you can trust, delivered right to your doorstep.
                    </p>
                    <div className="flex flex-col gap-1 mt-4">
                        <a href="tel:+8801700000000" className="text-[15px] text-[#262626] font-bold hover:text-[#555555] transition-colors">
                            +880 17XX-XXXXXX
                        </a>
                        <a href="mailto:contact@orebistore.com" className="text-[15px] text-[#262626] font-bold hover:text-[#555555] transition-colors">
                            contact@orebistore.com
                        </a>
                        <p className="text-sm text-[#555555] mt-2">
                            Dhaka, Bangladesh
                        </p>
                    </div>
                </div>
                {/* quick links */}
                <div className="lg:col-span-2 lg:ml-auto">
                    <h4 className="text-[#262626] font-bold text-base uppercase tracking-widest mb-6">Explore</h4>
                    <ul className="flex flex-col gap-4">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'About Us', path: '/about' },
                            { name: 'Our Shop', path: '/shop' },
                            { name: 'Contact Us', path: '/contact' }
                        ].map((item, index) => (
                            <li key={index}>
                                <Link 
                                    to={item.path} 
                                    className="text-[#555555] text-sm hover:text-[#262626] hover:translate-x-1 inline-block transition-transform duration-300 font-medium"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* categories */}
                <div className="lg:col-span-3 lg:ml-auto">
                    <h4 className="text-[#262626] font-bold text-base uppercase tracking-widest mb-6">Top Categories</h4>
                    <ul className="flex flex-col gap-4">
                        {footerCategories.map((item, index) => (
                            <li key={index}>
                                <Link 
                                    to={`/category/${item.toLowerCase().replace(' ', '-')}`} 
                                    className="text-[#555555] text-sm hover:text-[#262626] hover:translate-x-1 inline-block transition-transform duration-300 font-medium capitalize"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* account & support */}
                <div className="lg:col-span-3 lg:ml-auto">
                    <h4 className="text-[#262626] font-bold text-base uppercase tracking-widest mb-6">Account & Help</h4>
                    <ul className="flex flex-col gap-4">
                        {[
                            { name: 'Login', path: '/login' },
                            { name: 'Create Account', path: '/signup' },
                            { name: 'Shopping Cart', path: '/cart' },
                            { name: 'Track Order', path: '/track' }
                        ].map((item, index) => (
                            <li key={index}>
                                <Link 
                                    to={item.path} 
                                    className="text-[#555555] text-sm hover:text-[#262626] hover:translate-x-1 inline-block transition-transform duration-300 font-medium"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* bottom footer */}
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* social icons */}
                <div className="flex gap-5">
                    <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer" className="text-[#555555] hover:text-[#262626] hover:-translate-y-1 transition-all duration-300">
                        <FaFacebookF className="text-lg" />
                    </a>
                    <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="text-[#555555] hover:text-[#262626] hover:-translate-y-1 transition-all duration-300">
                        <FaInstagram className="text-lg" />
                    </a>
                    <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="text-[#555555] hover:text-[#262626] hover:-translate-y-1 transition-all duration-300">
                        <FaLinkedinIn className="text-lg" />
                    </a>
                    <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer" className="text-[#555555] hover:text-[#262626] hover:-translate-y-1 transition-all duration-300">
                        <FaGithub className="text-lg" />
                    </a>
                </div>
                {/* developer credit */}
                <p className="text-xs sm:text-sm text-[#555555] text-center md:text-right font-medium tracking-wide">
                    © {currentYear} Orebi E-Commerce. <br className="md:hidden" />
                    Developed by <span className="text-[#262626] font-bold">Majharul Islam Sijan</span>.
                </p>
            </div>
        </Container>
    </footer>
    );
}

export default Footer;