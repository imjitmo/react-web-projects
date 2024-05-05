import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const UserPost = ({ postImg, postTitle }) => {
  return (
    <Link to="/zuckmarkerberg/post/1">
      <div className="flex w-full gap-2 mb-4 py-5">
        <div className="flex flex-col justify-center">
          <img className="w-12 object-contain rounded-full" alt="zuck markerberg" src="/zuck-avatar.png" />
          <div className="post-line"></div>
          <div className="relative w-full mx-2">
            <img className="liked-img top-0 left-0" src="https://bit.ly/dan-abramov" alt="image" />
            <img className="liked-img top-0 left-2" src="https://bit.ly/sage-adebayo" alt="image" />
            <img className="liked-img top-0 left-4" src="https://bit.ly/prosper-baba" alt="image" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex justify-between w-full">
            {/* flex1 */}
            <div className="flex w-full items-center">
              <p className="text-sm font-bold">zuckmarkerberg</p>
              <img src="/verified.png" className="w-4 h-4 ml-1" alt="verified" />
            </div>
            {/* flex2 */}
            <div className="flex gap-4 items-center">
              <p className="text-sm text-gray-400">1d</p>
              <div className="p-2 hover:bg-gray-700 hover:rounded-full hover:transition-all hover:duration-400 dropdown">
                <BsThreeDots tabIndex="0" className="cursor-pointer" onClick={(e) => e.preventDefault()} />
                <ul
                  tabIndex="0"
                  className="dropdown-content z-[1] menu mt-2 p-2 shadow-lg bg-base-100 rounded-box w-32 my-2"
                >
                  <li className="px-2 cursor-pointer mb-2">Share</li>
                  <li className="px-2 cursor-pointer mb-2">Delete</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Title */}
          <p className="text-sm">{postTitle}</p>
          {postImg && (
            <div className="rounded-lg overflow-hidden border-solid border border-gray-400">
              <img className="w-full object-contain" src={postImg} alt="post" />
            </div>
          )}
          <div className="flex flex-row gap-3 my-1">like</div>
        </div>
      </div>
    </Link>
  );
};

export default UserPost;
