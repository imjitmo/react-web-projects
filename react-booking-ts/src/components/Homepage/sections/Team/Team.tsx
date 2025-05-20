/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Cards from './Cards/Cards';

const Team = () => {
  const [show, setShow] = useState<any>('gregory');

  const Gregory = {
    button: 'https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/sir_gregorio.jpg',
    image: 'https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/sir_gregorio2.png',
    name: 'Mr. Gregorio M. Sison Jr.',
    role: 'School President',
    description:
      'Mr. Gregorio M. Sison Jr. is the esteemed President of SOFTNET, dedicated to advancing quality education and innovation in technology-driven learning. With a strong vision for academic excellence, he leads the institution in shaping future-ready professionals through cutting-edge programs and industry-aligned training. His leadership continues to drive SOFTNET’s mission of empowering students with the skills and knowledge needed for success in the modern world',
    links: [
      {
        facebook: '',
        google: '',
        linkedin: '',
        rss: '',
      },
    ],
  };

  const Kaye = {
    button: 'https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/kaye_btn.jpg',
    image: 'https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/KAYE_PIC.JPG',
    name: 'Ms. Kathleen Kaye Male',
    role: 'Front Office Service Trainer',
    description:
      'Ms. Kathleen Kaye Male is a committed Front Office Services Trainer at SOFTNET Information Technology Center Inc. She specializes in front desk operations, guest relations, and reservation procedures, equipping students with the skills and confidence needed for real-world hospitality settings. With her professional expertise and supportive approach, she helps shape future frontliners to provide exceptional service and uphold industry standards.',
    links: [
      {
        facebook: 'https://www.facebook.com/kayekath05',
        google: '',
        linkedin: '',
        rss: '',
      },
    ],
  };
  const Vir = {
    button: 'https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/v_btn.jpg',
    image: 'https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team//V_PIC.JPG',
    name: 'Ms. Virnadette Mabuting Olinares',
    role: 'Housekeeping Trainer',
    description:
      'Ms. Virnadette Mabuting Olinares is a passionate and dedicated Housekeeping Trainer at SOFTNET Information Technology Center Inc. With a strong background in hospitality, she equips students with essential housekeeping skills, focusing on cleanliness, attention to detail, and service excellence. Known for her patience and professionalism, Ms. Olinares plays a key role in shaping students into competent and confident hospitality professionals.',
    links: [
      {
        facebook: 'https://www.facebook.com/virnadette.olinares',
        google: '',
        linkedin: '',
        rss: '',
      },
    ],
  };
  return (
    <section
      id="team"
      className="min-h-screen h-auto flex flex-col content-center-safe items-center justify-center text-center dark:text-slate-50 gap-8 py-10 md:py-0"
    >
      <h1 className="text-3xl font-medium">Meet Our Team</h1>
      <div className="flex flex-row gap-4">
        <img
          src={Gregory.button}
          className={`rounded-full size-30 object-contain ${
            show !== 'gregory' ? ' opacity-50' : 'opacity-100 hover:animate-pulse'
          }  drop-shadow-xl drop-shadow-slate-500 dark:drop-shadow-slate-800`}
          alt="img-btn"
          onClick={() => setShow('gregory')}
        />
        <img
          src={Kaye.button}
          className={`rounded-full size-30 object-contain ${
            show === 'kaye' ? 'hover:animate-pulse opacity-100' : 'opacity-50'
          } drop-shadow-xl drop-shadow-slate-500 dark:drop-shadow-slate-800`}
          alt="img-btn"
          onClick={() => setShow('kaye')}
        />
        <img
          src={Vir.button}
          className={`rounded-full size-30 object-contain ${
            show !== 'vir' ? ' opacity-50' : 'opacity-100 hover:animate-pulse'
          }  drop-shadow-xl drop-shadow-slate-500 dark:drop-shadow-slate-800`}
          alt="img-btn"
          onClick={() => setShow('vir')}
        />
      </div>
      {show === 'gregory' && <Cards {...Gregory} />}
      {show === 'kaye' && <Cards {...Kaye} />}
      {show === 'vir' && <Cards {...Vir} />}
    </section>
  );
};
export default Team;
