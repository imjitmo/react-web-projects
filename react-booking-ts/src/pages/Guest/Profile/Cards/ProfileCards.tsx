import Setup from '@/components/Guest/Account/Setup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useGetGuestInformation } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { useShallow } from 'zustand/react/shallow';

interface GuestInformationProps {
  id?: string;
}
const ProfileCards = (id: GuestInformationProps) => {
  const { viewGuestInformation, isViewing } = useGetGuestInformation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [guestData, setGuestData] = useState<any>({});
  const { displayName, photo, email } = useStore(
    useShallow((state) => ({
      photo: state.photo,
      displayName: state.displayName,
      email: state.email,
    }))
  );
  const qrCodeRef = useRef(null);
  useEffect(() => {
    viewGuestInformation(id, {
      onSuccess: (data) => {
        setGuestData(data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, [id, viewGuestInformation, photo]);

  return (
    <Card className="min-w-[500px] max-w-[500px]">
      {!isViewing && guestData && (
        <>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <img
                src={photo ? photo : ''}
                alt={displayName ? displayName + '-img' : ''}
                className="size-20 rounded border-8 border-blue-950"
              />
              <div className={`${guestData.status ? 'text-green-600' : 'text-red-600'}`}>
                <Tiptools
                  title={guestData.status ? 'Active' : 'Inactive'}
                  titleClassName="text-xs text-slate-950 dark:text-slate-50"
                >
                  <FaCircle />
                </Tiptools>
              </div>
            </div>
            <CardTitle>
              {displayName && displayName}{' '}
              <span className="font-normal text-xs text-slate-400">{guestData.userType}</span>
            </CardTitle>
            <CardDescription className="text-xs italic flex flex-col gap-1">
              <div className="text-xs italic flex flex-row gap-4">
                {email && email} |{' '}
                {guestData.guestInfo
                  ? guestData?.guestInfo[0]?.contactNumber
                    ? guestData?.guestInfo[0]?.contactNumber
                    : 'unknown'
                  : 'unknown'}
              </div>
              <h4>
                Company: <span>{guestData?.company || 'Individual'}</span>
              </h4>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row">
            <div className="flex flex-col grow">
              <h1 className="text-md font-bold">Home Address</h1>
              <p className="text-sm italic">
                {guestData.guestInfo
                  ? guestData?.guestInfo[0]?.homeAddress
                    ? guestData?.guestInfo[0]?.homeAddress
                    : 'unknown'
                  : 'unknown'}
                ,{' '}
                {guestData.guestInfo
                  ? guestData?.guestInfo[0]?.streetName
                    ? guestData?.guestInfo[0]?.streetName
                    : 'unknown'
                  : 'unknown'}
              </p>
              <p className="text-sm italic">
                {guestData.guestInfo
                  ? guestData?.guestInfo[0]?.brgyAddress
                    ? guestData?.guestInfo[0]?.brgyAddress
                    : 'unknown'
                  : 'unknown'}
                , {guestData.guestInfo ? guestData?.guestInfo[0]?.municipalAddress : 'unknown'}
              </p>
              <p className="text-sm italic">
                {guestData.guestInfo
                  ? guestData?.guestInfo[0]?.provincialAddress
                    ? guestData?.guestInfo[0]?.provincialAddress
                    : 'unknown'
                  : 'unknown'}
              </p>
              {!isViewing && !guestData?.guestInfo?.length && (
                <div className="flex flex-col gap-2 py-2">
                  <p className="text-xs italic text-red-500">
                    Note: To continue using our application fully. Please, setup your profile first.
                  </p>
                  <Setup />
                </div>
              )}
            </div>
            <div className="justify-end items-end">
              <div ref={qrCodeRef}>
                <QRCodeCanvas
                  value={guestData?.id}
                  size={150}
                  className="rounded border-10 border-slate-50"
                />
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};
export default ProfileCards;
