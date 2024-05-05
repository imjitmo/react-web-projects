import avatar from '/profile.png';

const Comment = ({ reply }) => {
  return (
    <div className="flex gap-4 w-full py-2 my-2">
      <div>
        <img
          className="w-8 object-contain rounded-full"
          alt="zuck markerberg"
          src={reply.userProfilePic || avatar}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-row gap-4">
            <p className="text-sm font-semibold">{reply.username}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p>{reply.text}</p>
        </div>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default Comment;
