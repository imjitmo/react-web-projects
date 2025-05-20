import Signature from '@/components/Admin/Accounts/Signature';
import Update from '@/components/Admin/Accounts/Update';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TimestampTzFormatter } from '@/components/UiHooks/Formatter';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useStore } from '@/store/store';
import { FaCircle } from 'react-icons/fa';
import { useShallow } from 'zustand/react/shallow';

interface userDataProps {
  userId?: string;
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  userType?: string;
  section?: string;
  photo?: string;
  status?: boolean;
  signature?: string;
  created_at: Date;
}

const AccountCards = (userData: userDataProps) => {
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );

  return (
    <div>
      <Card className="min-w-[250px] max-w-[250px] max-h-[510px] capitalize bg-slate-100 dark:bg-slate-900">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="capitalize">
              {userData.firstName} {userData.lastName}
            </CardTitle>
            <Tiptools
              title={userData.status ? 'Active' : 'Inactive'}
              titleClassName="text-slate-950 dark:text-slate-50"
            >
              <span
                className={`flex flex-row items-center gap-1 ${
                  userData.status ? 'text-green-600' : 'text-red-600'
                } text-xs`}
              >
                <FaCircle size={12} />
              </span>
            </Tiptools>
          </div>
          <CardDescription>{userData.userType === 'staff' ? 'student' : 'admin'}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <img
            src={userData.photo}
            className="object-cover rounded h-42 w-64"
            alt={`${userData.firstName}-${userData.lastName}-img`}
          />
          <p className="text-sm font-medium">
            ID: #<span className="font-normal uppercase">{userData.userId?.substring(0, 8)}</span>
          </p>
          <p className="text-sm font-medium">
            Email: <span className="font-normal lowercase">{userData.email}</span>
          </p>
          <p className="text-sm font-medium">
            Section: <span className="font-normal">{userData.section ? userData.section : 'N/A'}</span>
          </p>
          <p className="text-sm font-medium">
            Added at: <span className="font-normal">{TimestampTzFormatter(userData.created_at)}</span>
          </p>
        </CardContent>

        <CardFooter className="flex flex-row gap-2">
          {userType === 'admin' && (
            <>
              <Signature
                firstName={userData.firstName}
                lastName={userData.lastName}
                id={userData.userId}
                signature={userData.signature}
              />
              {userData.userType !== 'admin' && (
                <Update id={userData.userId} status={userData.status} user={userData.email} />
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
export default AccountCards;
