import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { useRecoilState, useRecoilValue } from 'recoil';
import postsAtom from '../atoms/postsAtom.js';
import userAtom from '../atoms/userAtom.js';
import UserImage from '../hooks/UserImage.js';
import closeModal from '../hooks/modal.js';

const MAX_CHAR = 500;

const CreatePost = () => {
  const fileRef = useRef(null);
  const currentUser = useRecoilValue(userAtom);
  const { handleImageChange, imgUrl, setImgUrl } = UserImage();
  const [postText, setPostText] = useState('');
  const [remaining, setRemaining] = useState(MAX_CHAR);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postsAtom);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemaining(0);
    } else {
      setPostText(inputText);
      setRemaining(MAX_CHAR - inputText.length);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postedBy: currentUser._id,
          text: postText,
          img: imgUrl,
        }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error, { id: 'postError' });
        return;
      }
      toast.success('post created successfully!', { id: 'postSuccess' });
      setPosts([data, ...posts]);
      setPostText('');
      setImgUrl('');
      closeModal('create_post_modal');
      return;
    } catch (err) {
      toast.error(err.message, { id: 'err' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        data-hs-overlay="#create_post_modal"
        className="flex flex-row gap-1 bg-gray-700 p-3 rounded-lg fixed bottom-3 right-3"
      >
        <AiOutlinePlus className="w-6 h-auto text-gray-300" />{' '}
        <p className="font-medium text-gray-300">Post</p>
      </button>
      {/* //modal */}

      <div
        id="create_post_modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-12 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto ">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">Create Post</h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none"
                data-hs-overlay="#create_post_modal"
                disabled={loading}
                onClick={() => setImgUrl('')}
              >
                <AiOutlineClose className="w-4 h-auto text-gray-300" />
              </button>
            </div>
            <div className="w-full p-2">
              <div className="pt-4 w-full">
                <form onSubmit={handleSubmit}>
                  <textarea
                    name="text"
                    id="text"
                    className="textarea textarea-bordered w-full"
                    placeholder="Post content goes here..."
                    onChange={handleTextChange}
                    value={postText}
                  />
                  <div className="flex flex-row w-full justify-between">
                    <p className="font-xs font-bold text-right m-1 order-last">
                      {remaining}/{MAX_CHAR}
                    </p>
                    <BiImageAdd
                      className="w-7 h-auto ml-1 cursor-pointer order-first"
                      onClick={() => fileRef.current.click()}
                    />
                  </div>

                  <input type="file" name="img" id="img" ref={fileRef} onChange={handleImageChange} hidden />
                  {imgUrl && (
                    <div className="flex mt-1 w-full relative">
                      <img src={imgUrl} alt="selected img" className="rounded-lg w-full h-52 object-cover" />
                      <button className="absolute top-2 right-2" onClick={() => setImgUrl('')}>
                        <AiOutlineClose />
                      </button>
                    </div>
                  )}
                  <div className="flex flex-row w-full justify-between gap-4 mt-2">
                    <button
                      type="button"
                      className="w-24 rounded-lg p-2 bg-gray-700 text-gray-300 hover:bg-gray-900"
                      data-hs-overlay="#create_post_modal"
                      disabled={loading}
                      onClick={() => setImgUrl('')}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-32 rounded-lg p-2 bg-gray-700 text-gray-300 hover:bg-gray-900"
                    >
                      {loading ? (
                        <span className="items-center loading loading-dots loading-sm"></span>
                      ) : (
                        'Create Post'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
