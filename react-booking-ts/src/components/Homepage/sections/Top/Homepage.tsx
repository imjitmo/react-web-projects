// import { fadeIn } from '@/anim/variant';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { NavLink } from 'react-router-dom';
// import { motion } from 'framer-motion';

const Homepage = () => {
  return (
    <section
      id="homepage"
      className="bg-slate-50 relative w-screen h-screen overflow-hidden flex flex-row overscroll-contain overflow-y-auto cursor-default"
    >
      {/* <>
        <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/leaves.png')] bg-cover bg-bottom absolute opacity-30 inset-0 z-[0]"></div>
        <motion.div
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          animate={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-[url('https://i.postimg.cc/gc5PMj8V/bed.png')] bg-cover bg-bottom absolute inset-0 z-[1] hidden md:block"
        ></motion.div>

        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          animate={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="absolute md:top-1/2 md:left-1/2 md:-translate-x-1/3 md:-translate-y-1/2 flex flex-col flex-wrap gap-2 inset-0 z-[2] w-full justify-center md:justify-normal font-normal"
        >
          <h1>Accommodation or Home?</h1>
          <h1 className="text-3xl text-blue-900 font-bold">
            <span className="text-slate-950 font-normal">Experience The Art of </span> Hospitality.
          </h1>
          <p>Come & enjoy precious moment with us</p>
        </motion.div>
      </> */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
          Fade(),
        ]}
        opts={{
          align: 'start',
          loop: true,
          duration: 100,
        }}
        className="w-full relative"
        style={{ letterSpacing: '0.40em' }}
      >
        <CarouselContent>
          <CarouselItem>
            <div
              className="w-screen h-screen flex justify-center items-center content-safe-center text-slate-50"
              style={{
                backgroundImage: `linear-gradient(rgba(30, 41, 59 , 0.8), rgba(2,6,23, 0.9)), url('https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/SUITE.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            >
              <div className="flex flex-col gap-12 items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h1 className="text-6xl font-bold text-yellow-400 uppercase">SOFTNET HOTEL</h1>
                  <h3 className="text-2xl font-normal uppercase">Where Fun and Learning Connect</h3>
                  <p
                    className="text-md font-extralight uppercase text-yellow-400"
                    style={{ letterSpacing: '1em' }}
                  >
                    Welcome to our hotels
                  </p>
                </div>
                <NavLink to="/auth">
                  <Button
                    className="rounded-none bg-blue-900 border-2 border-slate-50 text-slate-50 hover:bg-yellow-400 hover:text-slate-950 w-42 h-10 uppercase"
                    style={{ letterSpacing: '0.25em' }}
                  >
                    Learn More
                  </Button>
                </NavLink>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div
              className="w-screen h-screen flex justify-center items-center content-safe-center text-slate-50"
              style={{
                backgroundImage: `linear-gradient(rgba(30, 41, 59 , 0.8), rgba(2,6,23, 0.9)), url('https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/DELUXE_BED.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            >
              <div className="flex flex-col gap-12 items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h1 className="text-6xl font-bold text-yellow-400 uppercase">SOFTNET HOTEL</h1>
                  <h3 className="text-2xl font-normal uppercase">Experience The Art of Hospitality</h3>
                  <p
                    className="text-md font-extralight uppercase text-yellow-400"
                    style={{ letterSpacing: '1em' }}
                  >
                    Come & enjoy precious moment with us
                  </p>
                </div>
                <NavLink to="/auth">
                  <Button
                    className="rounded-none bg-blue-900 border-2 border-slate-50 text-slate-50 hover:bg-yellow-400 hover:text-slate-950 w-42 h-10 uppercase"
                    style={{ letterSpacing: '0.25em' }}
                  >
                    Learn More
                  </Button>
                </NavLink>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div
              className="w-screen h-screen flex justify-center items-center content-safe-center text-slate-50"
              style={{
                backgroundImage: `linear-gradient(rgba(30, 41, 59 , 0.8), rgba(2,6,23, 0.9)), url('https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/DELUXE_TV.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            >
              <div className="flex flex-col gap-12 items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h1 className="text-6xl font-bold text-yellow-400 uppercase">SOFTNET HOTEL</h1>
                  <h3 className="text-2xl font-normal uppercase">want luxurious vacation?</h3>
                  <p
                    className="text-md font-extralight uppercase text-yellow-400"
                    style={{ letterSpacing: '1em' }}
                  >
                    Get accommodation today!
                  </p>
                </div>
                <NavLink to="/auth">
                  <Button
                    className="rounded-none bg-blue-900 border-2 border-slate-50 text-slate-50 hover:bg-yellow-400 hover:text-slate-950 w-42 h-10 uppercase"
                    style={{ letterSpacing: '0.25em' }}
                  >
                    Learn More
                  </Button>
                </NavLink>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="">
          <CarouselDots />
        </div>
      </Carousel>
    </section>
  );
};
export default Homepage;
