import React, { useEffect, useRef, useState } from 'react';
import mixitup from 'mixitup'; 
import Container from '../Container';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Flex from '../Flex';
import { IoGrid } from "react-icons/io5";
import { CiGrid2H } from "react-icons/ci";
import Product from '../Product';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Shop = () => {
    const containerRef = useRef(null);
    const [allData, setAllData] = useState([]);
    
    // Loading State
    const [isLoading, setIsLoading] = useState(true); 

    // Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    
    useEffect(() => {
        async function fetchAllDatas() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products?limit=200");
                setAllData(response.data.products);
            } catch (error) {
                console.error("data not found", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAllDatas();
    }, []);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allData.length / itemsPerPage);

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

    // MixItUp Logic
    useEffect(() => {
        let mixer;
        if (containerRef.current && currentItems.length > 0 && !isLoading) {
            mixer = mixitup(containerRef.current, {
                animation: {
                    duration: 400,
                }
            });
        }
        return () => {
            if (mixer) {
                mixer.destroy();
            }
        };
    }, [currentItems, isLoading]);

    const dummyCategories = ['catOne', 'catTwo', 'catThree', 'catFour', 'catFive'];

    return (
        <>
        {/* breadcrumb part */}
        <Container className={'py-10 md:py-16 lg:py-[125px] px-4 lg:px-0'}>
            <h3 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-3 md:pb-5">Shop</h3>
            <Flex className={'text-[12px] text-[#767676] gap-x-2 items-center'}>
                <p>Home</p>
                <FaArrowRight />
                <p>Shop</p>
            </Flex>
        </Container>
        <Container className={'px-4 lg:px-0 pb-16 md:pb-20 lg:pb-[100px]'}>
            <Flex className={'flex-col lg:flex-row justify-between items-start gap-x-8 gap-y-10 lg:gap-y-0'}>
                {/* sidebar */}
                <div className="sideBar w-full lg:w-[25%] pb-5 lg:pb-[30px]">
                    <div className="category">
                        <h4 className='text-[#262626] font-bold text-[18px] md:text-[20px] pb-4 md:pb-[30px]'>Shop By Category</h4>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-col lg:flex-nowrap gap-x-4">
                            <p data-filter="all" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300'>All Products</p>
                            <p data-filter=".catOne" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300'>Category 1</p>
                            <p data-filter=".catTwo" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300'>Category 2</p>
                            <p data-filter=".catThree" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300'>Category 3</p>
                            <p data-filter=".catFour" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300'>Category 4</p>
                            <p data-filter=".catFive" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300'>Category 5</p>
                        </div>
                    </div>
                    <div className="color py-6 lg:py-10">
                        <h4 className='text-[#262626] font-bold text-[18px] md:text-[20px] pb-4 md:pb-[30px]'>Shop by Color</h4>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-col lg:flex-nowrap gap-x-4">
                            <div data-filter="all" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300 flex gap-x-2.5 items-center'>
                                <p>All Color</p>
                            </div>
                            <div data-filter=".catOne" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300 flex gap-x-2.5 items-center'>
                                <div className="rounded-[50%] h-3 w-3 md:h-4 md:w-4 bg-black"></div>
                                <p>Color 1</p>
                            </div>
                            <div data-filter=".catTwo" className='w-full sm:w-[48%] lg:w-full text-[#767676] text-sm md:text-base border-b border-[#F0F0F0] pb-2.5 md:pb-[22px] my-2 md:my-[15px] lg:my-[25px] cursor-pointer hover:font-bold hover:text-black duration-300 flex gap-x-2.5 items-center'>
                                <div className="rounded-[50%] h-3 w-3 md:h-4 md:w-4 bg-[#FF8686]"></div>
                                <p>Color 2</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* main content */}
                <div className="w-full lg:w-[75%]">
                    {/* top filtering bar */}
                    <div className="firstLine flex flex-col md:flex-row justify-between items-start md:items-center pb-6 md:pb-10 lg:pb-[50px] gap-y-4 md:gap-y-0">
                        <div className='flex gap-x-3'>
                            <div className="p-2 border border-[#F0F0F0] bg-black text-white cursor-pointer hover:bg-black hover:text-white transition-all">
                                <IoGrid className='text-[18px] md:text-[20px]'/>
                            </div>
                            <div className="p-2 border border-[#F0F0F0] text-[#737373] cursor-pointer hover:bg-black hover:text-white transition-all">
                                <CiGrid2H className='text-[18px] md:text-[20px]'/>
                            </div>
                        </div>
                        {/* dropdowns */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-x-5 w-full md:w-auto">
                            <div className="flex justify-between sm:justify-start gap-x-2 items-center w-full sm:w-auto">
                                <p className='text-[#767676] text-sm md:text-base whitespace-nowrap'>Sort by:</p>
                                <select className='flex-1 sm:flex-none px-2 md:px-4 py-1.5 md:py-2 text-[#767676] text-sm md:text-base border border-[#F0F0F0] outline-none w-full max-w-[180px] sm:w-28 md:w-40 cursor-pointer'>
                                    <option value="">Featured</option>
                                    <option value="">Best Sellers</option>
                                    <option value="">New Arrivals</option>
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
                    {/* product grid */}
                    <div className="pt-2 w-full" ref={containerRef}>
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20 w-full">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-10 h-10 border-4 border-[#262626] border-t-transparent rounded-full animate-spin"></div>
                                    <h2 className="text-xl font-bold animate-pulse text-[#767676]">Loading Products...</h2>
                                </div>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8'>
                                {currentItems.map((item, index) => {
                                    const filterClass = dummyCategories[index % dummyCategories.length];
                                    const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                    return (
                                        <div key={item.id} className={`mix ${filterClass} w-full`}>
                                            <Link to={`/product/${itemSlug}`} state={{ item: item }} className="block h-full cursor-pointer duration-300">
                                                <Product
                                                    productImg={item.thumbnail}
                                                    badgeText={item.stock}
                                                    productTitle={item.title}
                                                    productPrice={item.price}
                                                />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {/* pagination */}
                        {!isLoading && totalPages > 1 && (
                            <div className="flex justify-center md:justify-end mt-12 md:mt-20 w-full overflow-hidden">
                                <div className="flex items-center gap-x-1">
                                    <button
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`group flex items-center gap-x-1 sm:gap-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-all duration-300 ${
                                            currentPage === 1 
                                                ? 'text-gray-400 cursor-not-allowed border border-transparent' 
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
                                                    className={`flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded text-[10px] sm:text-xs md:text-sm transition-all duration-300 ${
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
                                        className={`group flex items-center gap-x-1 sm:gap-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-all duration-300 ${
                                            currentPage === totalPages 
                                                ? 'text-gray-400 cursor-not-allowed border border-transparent' 
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
                </div>
            </Flex>
        </Container>
        </>
    )
}

export default Shop;