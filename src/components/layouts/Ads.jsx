import { Link } from 'react-router-dom'
import sh1 from '../../assets/sh1.png'
import sh2 from '../../assets/sh2.png'
import sh3 from '../../assets/sh3.png'
import Container from '../Container'
import Flex from '../Flex'
import Images from '../Images'

const Ads = () => {
    return (
        <div className="py-[50px] md:py-20 lg:py-[135px]">
            <Container>
                <Flex className="flex-col lg:flex-row flex-wrap lg:flex-nowrap lg:justify-between lg:gap-x-8 gap-y-4 sm:gap-y-6 md:gap-y-8 lg:gap-y-0">
                    {/* left banner */}
                    <div className="lg:leftSide w-full lg:w-1/2 relative flex justify-center">
                        <Link to={'/shop'} className="w-full" aria-label="Shop our pendant lamps sale">
                            <Images imgSrc={sh1} alt="Pendant lamps sale" />
                        </Link>
                    </div>
                    {/* right banners */}
                    <div className="lg:rightSide w-full lg:w-1/2 relative">
                        <div className="lg:pb-8 w-full flex justify-center">
                            <Link to={'/shop'} className="w-full" aria-label="Shop electronics and clocks offer">
                                <Images imgSrc={sh2} alt="Electronics sale" />
                            </Link>
                        </div>
                        <div className='mt-4 sm:mt-6 md:mt-8 lg:mt-0 w-full flex justify-center'>
                            <Link to={'/shop'} className="w-full" aria-label="Shop furniture and lighting offer">
                                <Images imgSrc={sh3} alt="Furniture offer" />
                            </Link>
                        </div>
                    </div>
                </Flex>
            </Container>
        </div>
    )
}

export default Ads