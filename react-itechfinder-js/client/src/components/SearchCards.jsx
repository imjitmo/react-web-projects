import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fadeIn } from '../utils/Variants';
import Map from './Map';
import SocialLinks from './SocialLinks';
import Star from './Star';

export default function SearchCards(props) {
  const { searchData, user, setFollow } = props;
  const [followLoading, setFollowLoading] = useState(false);
  const [search, setSearch] = useState(searchData);
  const [followed, setFollowed] = useState(search?.followers.includes(user));

  const shopInfo = (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        <div className="flex size-12 justify-center items-center bg-slate-400 text-white font-bold rounded-xl uppercase">
          <span className="text-lg self-center text-center">
            {search.shopName
              .split(' ')
              .map((name) => name[0])
              .join('')}
          </span>
        </div>
        <div className="truncate">
          <div className="font-bold text-xl truncate">{search?.shopName}</div>
          <div className="text-xs opacity-70 capitalize">{search?.ownerName}</div>
          <div className="text-xs opacity-70 capitalize">
            {search?.shopAddress.shopStreet}, {search?.shopAddress.shopBarangay},{' '}
            {search?.shopAddress.shopCity}, {search?.shopAddress.shopProvince}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <Star reviews={search?.raters} stars={search?.rating / search?.raters} />
        </div>
        <span className="text-xs">
          <strong>Services Offered:</strong>{' '}
          <span className="capitalize italic badge badge-primary badge-sm text-white">
            {search?.shopType.join(', ')}
          </span>
        </span>
        <span className="text-xs">
          <strong>Gadget List:</strong>
          <span className="capitalize italic text-blue-700 px-2">{search?.gadgetList.join(', ')}</span>
        </span>
      </div>
      {search?.socialLinks && (
        <div className="py-1">
          <SocialLinks
            facebook={search?.socialLinks.facebook}
            instagram={search?.socialLinks.instagram}
            twitter={search?.socialLinks.twitter}
            tiktok={search?.socialLinks.tiktok}
            youtube={search?.socialLinks.youtube}
            linkedin={search?.socialLinks.linkedin}
          />
        </div>
      )}
      <div className="flex-1">
        <a
          href={`https://www.google.com/maps/@${search?.geoCode.join(',')},15z?entry=ttu`}
          target="_blank"
          rel="noreferrer"
        >
          <button className="btn google-btn grow w-full">
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
            View on Google Maps
          </button>
        </a>
      </div>
    </div>
  );

  console.log(user?._id);
  const handleFollow = async (shopId) => {
    try {
      setFollowLoading(true);
      const res = await fetch(`/api/user/follow/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopId }),
      });
      const data = await res.json();
      if (data.error) {
        setFollowLoading(false);
        return;
      }
      if (followed) {
        setSearch({ ...searchData, followers: searchData.followers.filter((id) => id !== user) });
        setFollowed(false);
        setFollow && setFollow(Math.random());
      } else {
        setSearch({ ...searchData, followers: [...searchData.followers, user] });
        setFollowed(true);
        setFollow && setFollow(data);
      }
      setFollowLoading(false);
    } catch (err) {
      setFollowLoading(false);
      console.log(err);
    }
  };

  const openModal = (e) => {
    document.getElementById(e).showModal();
  };

  const closeModal = (e) => {
    document.getElementById(e).close();
  };
  return (
    <>
      <motion.div
        key={search._id}
        variants={fadeIn('right', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: false, amount: 0.3 }}
        className="bg-slate-50 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full lg:w-[410px]"
      >
        <div className="p-3 flex flex-col gap-4 items-stretch px-6 py-4">
          <div className="flex flex-col gap-2">
            <Link to={`/store/${search._id}`}>
              <div className="flex flex-row gap-2">
                <div className="flex size-12 justify-center items-center bg-slate-400 text-white font-bold rounded-xl uppercase">
                  <span className="text-lg self-center text-center">
                    {search.shopName
                      .split(' ')
                      .map((name) => name[0])
                      .join('')}
                  </span>
                </div>
                <div className="truncate">
                  <div className="font-bold text-xl truncate">{search?.shopName}</div>
                  <div className="text-xs opacity-70 capitalize">{search?.ownerName}</div>
                  <div className="text-xs opacity-70 capitalize">
                    {search?.shopAddress.shopStreet}, {search?.shopAddress.shopBarangay},{' '}
                    {search?.shopAddress.shopCity}, {search?.shopAddress.shopProvince}
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-2">
                <div className="flex flex-row gap-1 items-center">
                  <Star reviews={search?.raters} stars={search?.rating / search?.raters} />
                </div>
                <span className="text-sm">
                  <strong>Services Offered:</strong>{' '}
                  <span className="capitalize italic badge badge-primary badge-sm text-white">
                    {search?.shopType.join(', ')}
                  </span>
                </span>
                <span className="text-sm">
                  <strong>Gadget List:</strong>
                  <span className="capitalize italic text-blue-700 px-2">
                    {search?.gadgetList.join(', ')}
                  </span>
                </span>
              </div>
            </Link>
            <div className="" id="social-links">
              <SocialLinks
                facebook={search?.socialLinks.facebook}
                instagram={search?.socialLinks.instagram}
                twitter={search?.socialLinks.twitter}
                tiktok={search?.socialLinks.tiktok}
                youtube={search?.socialLinks.youtube}
                linkedin={search?.socialLinks.linkedin}
              />
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex-none">
                <button className="btn btn-error" onClick={() => openModal(`modal__${search?._id}`)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                    />
                  </svg>
                </button>
              </div>
              {user && user?._id !== search?.userId && !user?.isAdmin && (
                <>
                  <div className="flex-initial mx-auto">
                    <button className="btn bg-slate-200" onClick={() => handleFollow(search?._id)}>
                      {followLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`size-8 ${
                            search && search?.followers.includes(user?._id) && 'text-red-400 fill-red-400'
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="flex-1">
                    {!user?.isOwner && search?.shopType.includes('repair') && (
                      <Link to={`/appointment?v=${user?._id}&p=${search?._id}`}>
                        <button className="btn primary-btn grow w-full"> Set Appointment </button>
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <dialog key={`key_${search?._id}`} id={`modal__${search?._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Map Location</h3>
          <div className="flex h-96 overflow-hidden">
            <Map storePosition={search?.geoCode} shopInfo={shopInfo} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
