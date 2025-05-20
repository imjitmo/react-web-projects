import Cards from './Cards/Cards';

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen h-auto flex flex-col content-center-safe items-center justify-center text-center dark:text-slate-50 gap-8 text-slate-50 py-10 md:py-0"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 41, 59 , 0.8), rgba(2,6,23, 0.9)), url('https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/g2.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <h1 className="text-3xl font-medium">Our Services</h1>
      <Cards />
    </section>
  );
};
export default Services;
