import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import DialogTool from '../DialogTool';
import UpdateDisplayName from './UpdateDisplayName';
import UpdatePassword from './UpdatePassword';

const Profile = () => {
  const [onDisplayName, setOnDisplayName] = useState(false);
  const [onPassword, setOnPassword] = useState(false);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-slate-50 bg-blue-700" size="icon">
            <IoPerson />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 bg-slate-950 text-slate-50">
          <ul className="flex flex-col flex-wrap gap-1 text-sm">
            <li
              className="hover:bg-slate-500/30 py-1 px-2 rounded-lg cursor-pointer"
              onClick={() => setOnDisplayName(true)}
            >
              Update Name
            </li>
            <li
              className="hover:bg-slate-500/30 py-1 px-2 rounded-lg cursor-pointer"
              onClick={() => setOnPassword(true)}
            >
              Change Password
            </li>
          </ul>
        </PopoverContent>
      </Popover>
      <DialogTool
        onOpen={onDisplayName}
        setOnOpen={setOnDisplayName}
        header="Update your Display Name"
        description="This will update your User Display Name"
      >
        <UpdateDisplayName setOnOpen={setOnDisplayName} />
      </DialogTool>
      <DialogTool
        onOpen={onPassword}
        setOnOpen={setOnPassword}
        header="Update your Password"
        description="This will update your User Password"
      >
        <UpdatePassword setOnOpen={setOnPassword} />
      </DialogTool>
    </>
  );
};
export default Profile;
