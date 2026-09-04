import Container from "../Container"
import Flex from "../Flex"
import { FaArrowRight } from "react-icons/fa";
import Images from "../Images";
import about1 from '../../assets/about1.png'
import about2 from '../../assets/about2.png'
import Button from "../Button";

const About = () => {
  return (
    <>
    <section className="py-2" id="about">
      {/* breadcrumb Part */}
      <Container className={'py-10 md:py-20 lg:py-[125px] px-4 lg:px-0'}>
          <h3 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-3 md:pb-5">About</h3>
          <Flex className={'text-[12px] text-[#767676] gap-x-2 items-center'}>
              <p>Home</p>
              <FaArrowRight />
              <p>About</p>
          </Flex>
      </Container>
      {/* Images */}
      <Container className={'pb-[50px] md:pb-20 lg:pb-[100px] px-4 lg:px-0'}>
        <Flex className={'flex-col md:flex-row justify-between gap-y-8 md:gap-y-0 md:gap-x-6 lg:gap-x-10'}>
          <div className="leftSide relative w-full md:w-1/2">
            <Images imgSrc={about1} className="w-full object-cover"/>
            <Button btnText={'Our Brands'} className={'py-3 px-8 md:py-4 md:px-14 absolute bottom-5 md:bottom-[30px] lg:bottom-[50px] left-[50%] -translate-x-[50%] text-sm md:text-base whitespace-nowrap'}/>
          </div>
          <div className="rightSide relative w-full md:w-1/2">
            <Images imgSrc={about2} className="w-full object-cover"/>
            <Button btnText={'Our Stores'} className={'py-3 px-8 md:py-4 md:px-14 absolute bottom-5 md:bottom-[30px] lg:bottom-[50px] left-[50%] -translate-x-[50%] text-sm md:text-base whitespace-nowrap'}/>
          </div>
        </Flex>
      </Container>
      {/* Text */}
      <Container className={'px-4 lg:px-0'}>
        <h4 className="text-[20px] md:text-[28px] lg:text-[39px] leading-[30px] md:leading-[42px] lg:leading-[52px]">
          Orebi is one of the world’s leading ecommerce brands and is internationally recognized for celebrating the essence of classic Worldwide cool looking style.
        </h4>
      </Container>
      {/* Three Columns */}
      <Container className={'py-[50px] md:py-20 lg:py-[120px] px-4 lg:px-0'}>
        <Flex className={'flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between gap-y-10 md:gap-y-12 lg:gap-y-0 lg:gap-x-5'}>
          <div className="w-full md:w-[48%] lg:w-1/3">
            <h4 className="pb-[15px] md:pb-[25px] text-[20px] md:text-[25px] text-[#262626] font-bold">Our Vision</h4>
            <p className="text-[#767676] leading-[26px] md:leading-[30px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dolor hic architecto dolorem blanditiis, voluptates quibusdam porro ut. Earum, nam.</p>
          </div>
          <div className="w-full md:w-[48%] lg:w-1/3">
            <h4 className="pb-[15px] md:pb-[25px] text-[20px] md:text-[25px] text-[#262626] font-bold">Our Story</h4>
            <p className="text-[#767676] leading-[26px] md:leading-[30px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dolor hic architecto dolorem blanditiis, voluptates quibusdam porro ut. Earum, nam.</p>
          </div>
          <div className="w-full lg:w-1/3">
            <h4 className="pb-[15px] md:pb-[25px] text-[20px] md:text-[25px] text-[#262626] font-bold">Our Brands</h4>
            <p className="text-[#767676] leading-[26px] md:leading-[30px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dolor hic architecto dolorem blanditiis, voluptates quibusdam porro ut. Earum, nam.</p>
          </div>
        </Flex>
      </Container>
    </section>
    </>
  )
}

export default About