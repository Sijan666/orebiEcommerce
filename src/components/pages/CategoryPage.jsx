import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Product from "../Product";
import Container from "../Container";

const CategoryPage = () => {
    const { categoryName } = useParams(); 
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const displayCategoryName = categoryName ? categoryName.replace(/-/g, ' ') : '';

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://dummyjson.com/products/category/${categoryName}`);
                setProducts(response.data.products);
            } catch (error) {
                console.error("Failed to fetch category products", error);
                setProducts([]); 
            } finally {
                setIsLoading(false);
            }
        };

        if (categoryName) {
            fetchCategoryProducts();
        }
    }, [categoryName]);

    return (
        <div className="bg-white min-h-screen pb-24 font-sans">
            <Container className={'py-10 md:py-16 px-4 lg:px-0'}>
                <h3 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-3 md:pb-5 capitalize">
                    {displayCategoryName}
                </h3>
                <div className="flex text-[12px] text-[#767676] gap-x-2 items-center">
                    <Link to="/" className="hover:text-black duration-300">Home</Link>
                    <FaArrowRight className="text-[10px]" />
                    <Link to="/shop" className="hover:text-black duration-300">Shop</Link>
                    <FaArrowRight className="text-[10px]" />
                    <p className="capitalize text-[#262626] font-medium">{displayCategoryName}</p>
                </div>
            </Container>
            <Container className={'px-4 lg:px-0 pb-16 md:pb-20'}>
                {isLoading ? (
                    <div className="flex justify-center items-center py-20 w-full">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-[#262626] border-t-transparent rounded-full animate-spin"></div>
                            <h2 className="text-xl font-bold animate-pulse text-[#767676]">Loading Products...</h2>
                        </div>
                    </div>
                ) : products.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8'>
                        {products.map((item) => {
                            const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                            
                            return (
                                <div key={item.id} className="w-full">
                                    <Link to={`/product/${itemSlug}`} state={{ item: item }} className="block h-full cursor-pointer duration-300">
                                        <Product
                                            productImg={item.thumbnail}
                                            badgeText={item.discountPercentage ? `-${Math.round(item.discountPercentage)}%` : "New"}
                                            productTitle={item.title}
                                            productPrice={`$${item.price}`}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-[#F3F3F3] rounded-lg">
                        <span className="text-5xl mb-4 block">🔍</span>
                        <h3 className="text-xl font-bold text-[#262626] mb-2 tracking-tight">No products found</h3>
                        <p className="text-[#767676] max-w-sm mx-auto text-sm">
                            We couldn't find any products in the <span className="font-bold capitalize text-black">{displayCategoryName}</span> category at the moment.
                        </p>
                        <Link 
                            to="/shop" 
                            className="inline-flex items-center justify-center mt-8 bg-black text-white px-8 py-3 rounded text-sm font-medium hover:bg-[#262626] transition-all"
                        >
                            Browse All Products
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default CategoryPage;