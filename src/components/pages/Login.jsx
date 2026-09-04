import { Link } from "react-router-dom";
import Button from "../Button";
import Container from "../Container"
import Flex from "../Flex"
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
    return (
        <>
        <section id="login">
            {/* breadcrumb part */}
            <Container className={'py-10 md:py-16 lg:py-[100px] px-4 lg:px-0'}>
                <h3 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-3 md:pb-5">Login</h3>
                <Flex className={'text-[12px] text-[#767676] gap-x-2 items-center'}>
                    <p>Home</p>
                    <FaArrowRight />
                    <p>Login</p>
                </Flex>
            </Container>
            {/* intro */}
            <Container className={'pb-4 md:pb-[11px] px-4 lg:px-0'}>
                <p className="text-sm md:text-base text-[#767676] border-b border-[#F0F0F0] pb-8 md:pb-[60px] w-full lg:w-[620px]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.
                </p>
            </Container>
            {/* returning customer part */}
            <Container className={'py-10 md:py-[60px] px-4 lg:px-0'}>
                <h4 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-3 md:pb-5">Returning Customer</h4>
                <div className="pt-4 md:pt-[50px]">
                    <Flex className={'gap-y-6 md:gap-x-10 lg:gap-x-5 flex-col md:flex-row'}>
                        <div className="email w-full md:w-1/2 lg:w-[400px]">
                            <h4 className="pb-2 md:pb-4 text-[#262626] font-bold text-sm md:text-base">Email address</h4>
                            <input type="email" placeholder="company@domain.com" className="text-sm md:text-base outline-none border-b border-[#F0F0F0] pb-2 md:pb-4 w-full lg:w-[300px]"/>
                        </div>
                        <div className="pass w-full md:w-1/2 lg:w-[400px]">
                            <h4 className="pb-2 md:pb-4 text-[#262626] font-bold text-sm md:text-base">Password</h4>
                            <input type="password" placeholder="********" className="text-sm md:text-base outline-none border-b border-[#F0F0F0] pb-2 md:pb-4 w-full lg:w-[300px]"/>
                        </div>
                    </Flex>
                    <div className="pt-8 md:pt-[25px] pb-10 md:pb-[45px] border-b border-[#F0F0F0]">
                        <Button btnText={'Log in'} className={'w-full sm:w-auto px-10 sm:px-20 py-3 sm:py-4 border border-black hover:text-black hover:bg-transparent duration-300 hover:border hover:border-black text-sm sm:text-base'}/>
                    </div>
                </div>
            </Container>
            {/* new customer part */}
            <Container className={'px-4 lg:px-0'}>
                <h4 className="text-[28px] md:text-[34px] lg:text-[39px] text-[#262626] font-bold block pb-3 md:pb-5">New Customer</h4>
                <div className="py-2 md:py-5">
                    <p className="text-sm md:text-base text-[#767676] pb-6 md:pb-[35px] w-full lg:w-[620px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.
                    </p>
                    <div className="pt-4 md:pt-[25px] pb-10 md:pb-[70px]">
                        <Link to={'/signup'} className="block w-full sm:w-auto">
                            <Button btnText={'Continue'} className={'w-full sm:w-auto px-10 sm:px-20 py-3 sm:py-4 border border-black hover:text-black hover:bg-transparent duration-300 hover:border hover:border-black text-sm sm:text-base'}/>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
        </>
    )
}

export default Login