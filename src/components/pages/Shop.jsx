import React, { useEffect, useState } from 'react';
import Container from '../Container';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Flex from '../Flex';
import { IoGrid } from "react-icons/io5";
import { CiGrid2H } from "react-icons/ci";
import Product from '../Product';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [allData, setAllData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');
    const [viewMode, setViewMode] = useState('grid'); 

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products?limit=200");
                setAllData(response.data.products);
                const uniqueCategories = [...new Set(response.data.products.map(item => item.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Data not found", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    let processedData = [...allData];
    if (selectedCategory !== 'all') {
        processedData = processedData.filter(item => item.category === selectedCategory);
    }

    if (sortOption === 'priceLowToHigh') {
        processedData.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
        processedData.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'nameAZ') {
        processedData.sort((a, b) => a.title.localeCompare(b.title));
    }

    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = processedData.slice(indexOfFirstItem, indexOfLastItem);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); 
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); 
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPaginationNumbers = () => {
        const pages = [];
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <>
            <Container className={'py-10 md:py-16 lg:py-[125px] px-4 lg:px-0'}>
                <h3 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-3 md:pb-5">Shop</h3>
                <Flex className={'text-[12px] text-[#767676] gap-x-2 items-center cursor-pointer'}>
                    <Link to="/" className="hover:text-black">Home</Link>
                    <FaArrowRight />
                    <p className="text-black font-semibold">Shop</p>
                </Flex>
            </Container>

            <Container className={'px-4 lg:px-0 pb-16 md:pb-20 lg:pb-[100px]'}>
                <Flex className={'flex-col lg:flex-row justify-between items-start gap-x-8 gap-y-10 lg:gap-y-0'}>
                    
                    {/* Sidebar */}
                    <div className="sideBar w-full lg:w-[25%] pb-5 lg:pb-[30px]">
                        <div className="category">
                            <h4 className='text-[#262626] font-bold text-[18px] md:text-[20px] pb-4 md:pb-[30px]'>Shop By Category</h4>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-col lg:flex-nowrap gap-x-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                <p 
                                    onClick={() => handleCategoryChange('all')}
                                    className={`w-full sm:w-[48%] lg:w-full text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300 capitalize ${selectedCategory === 'all' ? 'font-bold text-black' : 'text-[#767676]'}`}
                                >
                                    All Products
                                </p>
                                {categories.map((cat, index) => (
                                    <p 
                                        key={index}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`w-full sm:w-[48%] lg:w-full text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300 capitalize ${selectedCategory === cat ? 'font-bold text-black' : 'text-[#767676]'}`}
                                    >
                                        {cat.replace('-', ' ')}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-[75%]">
                        <div className="firstLine flex flex-col md:flex-row justify-between items-start md:items-center pb-6 md:pb-10 lg:pb-[50px] gap-y-4 md:gap-y-0">
                            
                            <div className='flex gap-x-3'>
                                <div 
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 border border-[#F0F0F0] cursor-pointer transition-all ${viewMode === 'grid' ? 'bg-black text-white' : 'text-[#737373] hover:bg-black hover:text-white'}`}
                                >
                                    <IoGrid className='text-[18px] md:text-[20px]'/>
                                </div>
                                <div 
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 border border-[#F0F0F0] cursor-pointer transition-all ${viewMode === 'list' ? 'bg-black text-white' : 'text-[#737373] hover:bg-black hover:text-white'}`}
                                >
                                    <CiGrid2H className='text-[18px] md:text-[20px]'/>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-5 w-full md:w-auto">
                                <div className="flex justify-between sm:justify-start gap-x-2 items-center w-full sm:w-auto">
                                    <p className='text-[#767676] text-sm md:text-base whitespace-nowrap'>Sort by:</p>
                                    <select 
                                        value={sortOption}
                                        onChange={handleSortChange}
                                        className='flex-1 sm:flex-none px-2 md:px-4 py-1.5 md:py-2 text-[#767676] text-sm md:text-base border border-[#F0F0F0] outline-none w-full max-w-[180px] sm:w-36 md:w-44 cursor-pointer'
                                    >
                                        <option value="default">Featured</option>
                                        <option value="nameAZ">Alphabetical (A-Z)</option>
                                        <option value="priceLowToHigh">Price: Low to High</option>
                                        <option value="priceHighToLow">Price: High to Low</option>
                                    </select>
                                </div>
                                <div className="flex justify-between sm:justify-start gap-x-2 items-center w-full sm:w-auto">
                                    <p className='text-[#767676] text-sm md:text-base whitespace-nowrap'>Show:</p>
                                    <select 
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        className='flex-1 sm:flex-none px-2 md:px-4 py-1.5 md:py-2 text-[#767676] text-sm md:text-base border border-[#F0F0F0] outline-none w-full max-w-[180px] sm:w-16 md:w-20 cursor-pointer'
                                    >
                                        <option value="12">12</option>
                                        <option value="24">24</option>
                                        <option value="36">36</option>
                                        <option value="48">48</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 w-full">
                            {isLoading ? (
                                <div className="flex justify-center items-center py-20 w-full">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-10 h-10 border-4 border-[#262626] border-t-transparent rounded-full animate-spin"></div>
                                        <h2 className="text-xl font-bold animate-pulse text-[#767676]">Loading Products...</h2>
                                    </div>
                                </div>
                            ) : currentItems.length > 0 ? (
                                {/* Grid container updated here: grid-cols-2 for mobile/small screens by default */}
                                <div className={`grid gap-5 lg:gap-8 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                    {currentItems.map((item) => {
                                        const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                        return (
                                            <div key={item.id} className="w-full">
                                                <Link to={`/product/${itemSlug}`} state={{ item: item }} className="block h-full cursor-pointer duration-300">
                                                    <Product
                                                        productImg={item.thumbnail}
                                                        badgeText={item.stock > 0 ? "In Stock" : "Out of Stock"}
                                                        productTitle={item.title}
                                                        productPrice={item.price}
                                                        layout={viewMode}
                                                        description={item.description}
                                                    />
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-gray-500 text-lg">
                                    No products found in this category.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {!isLoading && totalPages > 1 && (
                            <div className="flex justify-center md:justify-end mt-12 md:mt-20 w-full overflow-hidden">
                                <div className="flex items-center gap-x-1">
                                    <button
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`cursor-pointer disabled:cursor-not-allowed group flex items-center gap-x-1 sm:gap-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-all duration-300 ${
                                            currentPage === 1 
                                                ? 'text-gray-400 border border-transparent' 
                                                : 'text-black border border-[#F0F0F0] hover:bg-black hover:text-white'
                                        }`}
                                    >
                                        <FaArrowLeft className={`text-[9px] sm:text-[10px] md:text-xs transition-transform duration-300 ${currentPage !== 1 && 'group-hover:-translate-x-1'}`} /> 
                                        <span className="hidden sm:block">Prev</span>
                                    </button>
                                    
                                    <div className="flex items-center gap-x-0.5 sm:gap-x-1 px-0.5 sm:px-1">
                                        {getPaginationNumbers().map((page, index) => (
                                            page === '...' ? (
                                                <span key={`ellipsis-${index}`} className="px-1 sm:px-2 text-gray-500 font-bold tracking-widest select-none text-xs">
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`cursor-pointer flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded text-[10px] sm:text-xs md:text-sm transition-all duration-300 ${
                                                        currentPage === page 
                                                            ? 'bg-black text-white font-bold' 
                                                            : 'text-[#767676] border border-[#F0F0F0] hover:bg-black hover:text-white'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`cursor-pointer disabled:cursor-not-allowed group flex items-center gap-x-1 sm:gap-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-all duration-300 ${
                                            currentPage === totalPages 
                                                ? 'text-gray-400 border border-transparent' 
                                                : 'text-black border border-[#F0F0F0] hover:bg-black hover:text-white'
                                        }`}
                                    >
                                        <span className="hidden sm:block">Next</span> 
                                        <FaArrowRight className={`text-[9px] sm:text-[10px] md:text-xs transition-transform duration-300 ${currentPage !== totalPages && 'group-hover:translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </Flex>
            </Container>
        </>
    )
}

export default Shop;