import { AiOutlineLoading } from 'react-icons/ai';
const Loading = ({ size }: { size: number }) => {
  return <AiOutlineLoading size={size} className="animate-spin" />;
};
export default Loading;
