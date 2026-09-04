import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Images from "../Images";

const ShopBanner = () => {
    const [phoneData, setPhoneData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRandomPhone() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products/category/smartphones");
                const allPhones = response.data.products;
                const randomIndex = Math.floor(Math.random() * allPhones.length);
                setPhoneData(allPhones[randomIndex]);
            } catch (error) {
                console.error("Error fetching phone data for banner", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchRandomPhone();
    }, []);

    if (isLoading) {
        return (
            <div className="pt-8 pb-10 md:pb-16 lg:pb-20">
                <Container className={'bg-[#F3F3F3] h-[350px] flex items-center justify-center'}>
                    <div className="w-10 h-10 border-4 border-[#262626] border-t-transparent rounded-full animate-spin"></div>
                </Container>
            </div>
        );
    }

    if (!phoneData) return null;

    return (
        <div className="pt-8 pb-10 md:pb-16 lg:pb-20">
            <Container className={'bg-[#F3F3F3]'}>
                <Flex className="flex-col lg:flex-row items-center py-8 px-4 lg:py-0 lg:px-0 h-auto lg:h-[400px]">
                    {/* image */}
                    <div className="watch w-full lg:w-[40%] flex justify-center mb-6 lg:mb-0">
                        <Images 
                            imgSrc={phoneData.thumbnail} 
                            className="max-h-[250px] md:max-h-[300px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
                        />
                    </div>
                    {/* text */}
                    <div className="textPart w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-10">
                        <h3 className="font-bold text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] capitalize">
                            {phoneData.title}
                        </h3>
                        {/* description */}
                        <p className="py-5 lg:py-8 text-[14px] md:text-base text-[#262626] w-full lg:w-[511px] leading-relaxed">
                            {phoneData.description}
                        </p>
                        <Link to={`/product/${phoneData.id}`} state={{ item: phoneData }}>
                            <Button 
                                btnText={'Shop Now'} 
                                className={'py-3 px-10 md:py-4 md:px-14 text-sm md:text-base font-bold bg-black text-white hover:bg-gray-800 transition-all hover:shadow-lg'}
                            />
                        </Link>
                    </div>
                </Flex>
            </Container>
        </div>
    )
}

export default ShopBanner;