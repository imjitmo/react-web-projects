import { Input } from '@/components/ui/input';
import { FiSearch } from 'react-icons/fi';

const SearchTerm = ({
  setSearchTerm,
  placeholder,
}: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) => {
  return (
    <label className="relative flex items-center">
      <FiSearch className="absolute size-[1.25rem] left-2" />
      <Input
        className="pl-10 h-12 bg-slate-500/20 w-full"
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
    </label>
  );
};
export default SearchTerm;
