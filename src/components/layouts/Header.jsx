import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiChevronDown, FiLoader, FiMapPin } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import Container from "../Container";
import Images from "../Images";
import Logo from '../../assets/Logo.png';
import axios from "axios";
// Redux import
import { useSelector } from "react-redux";
import { useLenis } from 'lenis/react';
import Button from "../Button";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    // Live Search States
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const categoryRef = useRef();
    const userRef = useRef();
    const searchRef = useRef(); 
    const mobileSearchRef = useRef();
    
    // redux
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const lenis = useLenis();

    // Debounce effect for search
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(timerId);
    }, [searchQuery]);

    // Fetch optimized dynamic search results
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (debouncedSearch.trim() === "") {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }
            
            setIsSearching(true);
            try {
                const response = await axios.get(`https://dummyjson.com/products/search?q=${debouncedSearch}`);
                setSearchResults(response.data.products);
            } catch (error) {
                console.error("Failed to fetch search results", error);
            } finally {
                setIsSearching(false);
            }
        };
        fetchSearchResults();
    }, [debouncedSearch]);

    // scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    // click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) setShowCategory(false);
            if (userRef.current && !userRef.current.contains(event.target)) setShowUserMenu(false);
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
                lenis?.start();
            }
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
                lenis?.start();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [lenis]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
        { name: "Contacts", path: "/contact" },
    ];

    const categories = [
        "Smartphones", "Laptops", "Furniture", "Mens Shirts", 
        "Womens Dresses", "Womens Bags", "Mens Watches", "Sunglasses"
    ];

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim() !== "") {
            setShowSearchDropdown(true);
        } else {
            setShowSearchDropdown(false);
        }
    };

    const handleProductClick = (product, productSlug) => {
        navigate(`/product/${productSlug}`, { state: { item: product } });
        setShowSearchDropdown(false);
        setSearchQuery("");
        setDebouncedSearch(""); 
        setIsMobileMenuOpen(false);
        lenis?.start();
    };

    // Reusable function to render search results
    const renderSearchResults = (isMobile = false) => {
        if (isSearching) {
            return (
                <div className={`${isMobile ? "py-8" : "py-10"} flex flex-col items-center justify-center gap-2`}>
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-gray-500 font-medium">Searching...</span>
                </div>
            );
        }

        if (searchResults.length > 0) {
            return (
                <div className="grid gap-1">
                    {searchResults.map((product) => {
                        const productSlug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        return (
                            <div 
                                key={product.id} 
                                className="group flex items-center gap-x-3 md:gap-x-4 px-3 md:px-4 py-2 md:py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                                onMouseDown={(e) => {
                                    e.preventDefault(); 
                                    handleProductClick(product, productSlug);
                                }}
                            >
                                <div className="relative overflow-hidden rounded-md md:rounded-lg bg-gray-50 border border-gray-100 shrink-0">
                                    <img src={product.thumbnail} alt={product.title} className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} object-cover group-hover:scale-110 transition-transform duration-500`} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="text-[13px] md:text-[14px] font-semibold text-gray-800 truncate group-hover:text-black transition-colors">{product.title}</h4>
                                    <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5">{product.category}</p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="text-[13px] md:text-[14px] font-bold text-black">${product.price}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className={`${isMobile ? "py-6" : "py-10"} text-center flex flex-col items-center justify-center`}>
                {!isMobile && <span className="text-4xl mb-2" role="img" aria-label="Not found">🔍</span>}
                <p className="text-sm font-medium text-gray-900">No results found</p>
                {!isMobile && <p className="text-xs text-gray-500 mt-1">Try a different keyword</p>}
            </div>
        );
    };

    return (
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                    ? "bg-white border-b border-gray-100"
                    : isScrolled
                        ? "bg-white/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-gray-200/50"
                        : "bg-white border-b border-gray-100"
            }`}
        >
            <Container>
                {/* top */}
                <div className="flex items-center justify-between py-3 md:py-4 lg:py-5 gap-x-4 lg:gap-x-8 px-4 lg:px-0">
                    <div className="shrink-0 z-50">
                        <Link to="/" className="block transition-transform duration-300" aria-label="Go to Home">
                            <Images imgSrc={Logo} alt="Orebi Logo" className="h-6 md:h-7 lg:h-8 w-auto object-contain" width="120" height="32" />
                        </Link>
                    </div>
                    {/* Desktop search bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl justify-center relative" ref={searchRef}>
                        <form onSubmit={(e) => e.preventDefault()} className="relative w-full group z-50">
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
                                placeholder="Search for products, brands and more..." 
                                aria-label="Search for products"
                                className="w-full bg-gray-50/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-[14px] px-6 py-3 rounded-full outline-none transition-all duration-300 focus:bg-white focus:border-black/20 focus:shadow-[0_0_15px_rgba(0,0,0,0.05)] placeholder:text-gray-400"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                {isSearching && <FiLoader className="text-gray-400 text-lg animate-spin" />}
                                <button type="submit" aria-label="Search" className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300">
                                    <FiSearch className="text-md" />
                                </button>
                            </div>
                        </form>
                        {/* Desktop search dropdown */}
                        <div className={`absolute top-[120%] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] z-50 transition-all duration-300 ease-out origin-top ${showSearchDropdown ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
                            <div 
                                className="max-h-[350px] w-full overflow-y-auto rounded-2xl p-2" 
                                data-lenis-prevent
                                onMouseEnter={() => lenis?.stop()}
                                onMouseLeave={() => lenis?.start()}
                            >
                                {renderSearchResults(false)}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-2 md:gap-x-4 z-50">
                        <div ref={userRef} className="relative hidden md:block">
                            <button 
                                aria-label="User Menu"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-x-1 p-2 md:p-2.5 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-300"
                            >
                                <FiUser className="text-lg md:text-xl" />
                                <FiChevronDown className={`text-sm transition-transform duration-300 ${showUserMenu ? "rotate-180" : ""}`} />
                            </button>
                            <div className={`absolute top-full mt-2 w-[180px] right-0 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 origin-top-right ${showUserMenu ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
                                <div className="p-3 flex flex-col gap-2">
                                    <Link to={'/login'} onClick={() => setShowUserMenu(false)}>
                                        <Button 
                                            btnText="Log In" 
                                            className="w-full py-2 text-sm !bg-white !text-black border border-gray-200 hover:!bg-gray-50 transition-colors rounded-lg" 
                                        />
                                    </Link>
                                    <Link to={'/signup'} onClick={() => setShowUserMenu(false)}>
                                        <Button 
                                            btnText="Sign Up" 
                                            className="w-full py-2 text-sm hover:bg-gray-800 transition-colors rounded-lg" 
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link to="/track" title="Track Order" aria-label="Track Order" className="relative p-2 md:p-2.5 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-300">
                            <FiMapPin className="text-lg md:text-xl" />
                        </Link>
                        <Link to={'/cart'} aria-label="Shopping Cart" className="relative p-2 md:p-2.5 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-300">
                            <FiShoppingCart className="text-lg md:text-xl" />
                            {totalCartQuantity > 0 && (
                                <span className="absolute top-0 md:top-1 right-0 md:right-1 bg-red-500 text-white text-[9px] md:text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                                    {totalCartQuantity}
                                </span>
                            )}
                        </Link>
                        <button 
                            aria-label="Toggle Mobile Menu"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-800 focus:outline-none ml-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                        </button>
                    </div>
                </div>
                {/* bottom */}
                <div className={`hidden md:flex items-center justify-between pb-4 px-4 lg:px-0 transition-all duration-300 ${isScrolled ? "hidden" : "block"}`}>
                    <div ref={categoryRef} className="relative z-40">
                        <button 
                            onClick={() => setShowCategory(!showCategory)}
                            className="flex items-center gap-x-2 text-[14px] font-medium text-gray-700 hover:text-black hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-300"
                        >
                            <BiCategory className="text-lg" />
                            <span>Shop by Category</span>
                            <FiChevronDown className={`transition-transform duration-300 ${showCategory ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`absolute top-full mt-2 w-60 left-0 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${showCategory ? "scale-y-100 opacity-100 visible" : "scale-y-95 opacity-0 invisible"}`}>
                            <ul className="py-2">
                                {categories.map((item, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={`/category/${item.toLowerCase().replace(' ', '-')}`}
                                            className="block px-5 py-2.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50"
                                            onClick={() => setShowCategory(false)}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <nav className="flex items-center space-x-2">
                        {navLinks.map((link, index) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link key={index} to={link.path} className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all duration-300 ${isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </Container>
            {/* mobile menu */}
            <div className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-3xl transition-all duration-300 ease-in-out z-40 ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}`}>
                <div className="w-full h-dvh px-5 pt-[85px] pb-10 overflow-y-auto" data-lenis-prevent>
                    {/* mobile search bar */}
                    <div className="relative w-full mb-8 z-50" ref={mobileSearchRef}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
                                placeholder="Search products..." 
                                aria-label="Search products"
                                className="w-full bg-gray-50 border border-gray-200 shadow-sm text-[14px] px-5 py-3.5 rounded-xl outline-none focus:border-black/20 focus:bg-white transition-all" 
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                {isSearching && <FiLoader className="text-gray-400 text-lg animate-spin" />}
                                <button type="submit" aria-label="Search" className="p-1">
                                    <FiSearch className="text-gray-400 text-lg hover:text-black transition-colors" />
                                </button>
                            </div>
                        </form>
                        {/* mobile search dropdown */}
                        <div className={`absolute top-[110%] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-60 transition-all duration-300 ease-out origin-top ${showSearchDropdown ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
                            <div 
                                className="max-h-[300px] w-full overflow-y-auto rounded-xl p-2" 
                                data-lenis-prevent
                                onMouseEnter={() => lenis?.stop()}
                                onMouseLeave={() => lenis?.start()}
                            >
                                {renderSearchResults(true)}
                            </div>
                        </div>
                    </div>
                    <nav className="flex flex-col space-y-4 mb-8 border-b border-gray-100 pb-8">
                        {navLinks.map((link, index) => (
                            <Link key={index} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold transition-colors ${location.pathname === link.path ? "text-black" : "text-gray-400 hover:text-black"}`}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Categories</h4>
                        <ul className="flex flex-col space-y-4">
                            {categories.map((item, index) => (
                                <li key={index}>
                                    <Link to={`/category/${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 text-[15px] hover:text-black transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;