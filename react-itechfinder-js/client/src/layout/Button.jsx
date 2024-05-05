const Button = (props) => {
  return (
    <div>
      <button className="btn primary-btn text-white py-3 px-5 rounded-lg mt-4 hover:bg-gray-500 transition-all w-full">
        {props.title}
      </button>
    </div>
  );
};

export default Button;
