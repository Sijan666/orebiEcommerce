import React, { useState, useEffect } from 'react';
import Container from '../Container'
import Product from '../Product'
import axios from 'axios';
import { Link } from 'react-router-dom';

// Swiper JS imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';

const NewArrivals = () => {
    const [newProducts, setNewProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchNewArrivals() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products?limit=8&skip=10");
                setNewProducts(response.data.products);
            } catch (error) {
                console.error("data not found", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchNewArrivals();
    }, []);

    return (
        <div className="lg:pt-8 lg:pb-20 py-10">
            <Container>
                <h3 className="text-[26px] md:text-[32px] lg:text-[39px] text-[#262626] font-bold block pb-5 lg:pb-[30px]">New Arrivals</h3>
                {isLoading ? (
                    <div className="flex justify-center items-center py-20 w-full">
                        <div className="w-8 h-8 border-4 border-[#262626] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="relative lg:-mx-2"> 
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={15}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.custom-next',
                                prevEl: '.custom-prev',
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                480: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 20 },
                                1024: { slidesPerView: 4, spaceBetween: 30 },
                            }}
                            className="w-full pb-5"
                        >
                            {newProducts.map((item) => {
                                const itemSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                return (
                                    <SwiperSlide key={item.id}>
                                        <Link to={`/product/${itemSlug}`} state={{ item: item }} className="block h-full cursor-pointer duration-300">
                                            <Product
                                                productImg={item.thumbnail}
                                                badgeText="New"
                                                productTitle={item.title}
                                                productPrice={`$${item.price}`}
                                            />
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        {/* previous arrow */}
                        <button aria-label="Previous slide" className="custom-prev absolute top-[40%] left-0 lg:-left-5 z-10 w-8 h-8 bg-gray-100 hover:bg-black text-black hover:text-white flex items-center justify-center rounded-full -translate-y-1/2 transition-all duration-300 shadow-md">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        {/* next arrow */}
                        <button aria-label="Next slide" className="custom-next absolute top-[40%] right-0 lg:-right-5 z-10 w-8 h-8 bg-gray-100 hover:bg-black text-black hover:text-white flex items-center justify-center rounded-full -translate-y-1/2 transition-all duration-300 shadow-md">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default NewArrivals;