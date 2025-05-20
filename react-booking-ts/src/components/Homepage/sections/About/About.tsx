const About = () => {
  return (
    <section
      id="about"
      className="w-auto min-h-screen h-auto flex flex-col py-10 md:py-0 gap-4 content-center-safe items-center justify-center text-center dark:text-slate-50"
    >
      <div className="flex flex-col gap-8 flex-wrap w-xs md:w-6xl">
        <h1 className="text-3xl font-medium">About SOFTNET HOTEL</h1>
        <div className="flex flex-col gap-2 items-center justify-center content-center">
          <p>
            Welcome to SOFTNET Hotel, where excellence in hospitality meets innovation. Designed as a premier
            training hub for aspiring professionals, our hotel provides hands-on experience in front office
            services, guest management, and hotel operations. With a commitment to quality service and
            industry-standard practices, SOFTNET Hotel prepares students for success in the dynamic world of
            hospitality. Experience learning in a real-world setting—where every stay is a lesson in
            excellence!
          </p>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center content-center-safe">
          <img
            src="https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team//r1.jpg"
            className="w-72 object-contain"
            alt="aimg"
          />
          <img
            src="https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team//r2.jpg"
            className="w-72 object-contain"
            alt="bimg"
          />
          <img
            src="https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team//r3.jpg"
            className="w-72 object-contain"
            alt="cimg"
          />
          <img
            src="https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team//r4.jpg"
            className="w-72 object-contain"
            alt="dimg"
          />
        </div>
      </div>
    </section>
  );
};
export default About;
