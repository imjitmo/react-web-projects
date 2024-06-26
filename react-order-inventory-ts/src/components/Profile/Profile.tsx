import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { IoPerson } from 'react-icons/io5';

const Profile = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="text-slate-50 bg-blue-700" size="icon">
          <IoPerson />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 bg-slate-950 text-slate-50">
        <ul className="flex flex-col flex-wrap gap-1 text-sm">
          <li className="hover:bg-slate-500/30 py-1 px-2 rounded-lg cursor-pointer">Update Name</li>
          <li className="hover:bg-slate-500/30 py-1 px-2 rounded-lg cursor-pointer">Change Password</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
export default Profile;
