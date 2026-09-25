import Badge from "./Badge";
import Images from "./Images";

import { FaHeart } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const Product = ({ productImg, badgeText, productTitle, productPrice, layout, description }) => {
    return (
        <div className={`group mx-2 ${layout === 'list' ? 'flex flex-col md:flex-row items-center gap-6 border border-[#F0F0F0] p-4 hover:shadow-md duration-300' : ''}`}>
            
            {/* Image Section */}
            <div className={`relative overflow-hidden bg-[#F3F3F3] ${layout === 'list' ? 'w-full md:w-[40%] lg:w-[35%]' : 'w-full'}`}>
                <Images imgSrc={productImg} className={`${layout === 'list' ? 'h-[250px] object-cover w-full' : 'w-full'}`} />
                <Badge badgeText={badgeText} className={"absolute"} />
                
                {/* Hover Options Layer (Will work perfectly in both views) */}
                <div className="absolute text-right bg-white bottom-0 right-0 w-full py-5 opacity-0 group-hover:opacity-100 duration-300 px-4 translate-y-6 group-hover:translate-y-0">
                    <div className="flex gap-x-2 items-center justify-end text-base text-[#767676] hover:font-bold hover:text-[#262626] cursor-pointer duration-500">
                        <p className="">Add to Wish List</p>
                        <FaHeart />
                    </div>
                    <div className="flex gap-x-2 items-center justify-end text-base text-[#767676] hover:font-bold hover:text-[#262626] cursor-pointer duration-500 py-4">
                        <p className="">Compare</p>
                        <FaCodeCompare />
                    </div>
                    <div className="flex gap-x-2 items-center justify-end text-base text-[#767676] hover:font-bold hover:text-[#262626] cursor-pointer duration-500">
                        <p className="">Add to Cart</p>
                        <FaShoppingCart />
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className={`${layout === 'list' ? 'w-full md:w-[60%] lg:w-[65%]' : 'w-full'}`}>
                
                {/* Title & Price container */}
                <div className={`flex ${layout === 'list' ? 'flex-col items-start gap-y-2' : 'justify-between items-center lg:h-[75px] h-[25px]'} py-4 px-2`}>
                    <h4 className={`font-bold text-[#262626] ${layout === 'list' ? 'text-[18px] lg:text-[24px]' : 'lg:text-[20px] text-[10px]'}`}>
                        {productTitle}
                    </h4>
                    <p className={`text-[#767676] ${layout === 'list' ? 'text-base lg:text-[20px] font-bold text-black' : 'lg:text-base text-[10px]'}`}>
                        ${productPrice}
                    </p>
                </div>
                
                <p className={`text-[#767676] px-2 ${layout === 'list' ? 'text-sm lg:text-base' : 'lg:text-base text-[10px]'}`}>Black</p>
                
                {/* Description (Only shows in List View) */}
                {layout === 'list' && description && (
                    <div className="px-2 mt-4">
                        <p className="text-[#767676] text-sm lg:text-base leading-relaxed line-clamp-3">
                            {description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;