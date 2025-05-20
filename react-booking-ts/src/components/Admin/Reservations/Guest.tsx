import Loading from '@/components/Spinner/Loading';
import Modal from '@/components/UiHooks/Modal';
import { useGetGuestReserveCount } from '@/hooks/use/useReservation';
import { useGetGuestInformation } from '@/hooks/use/useUsers';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface GuestProps {
  id: any;
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Guest = (props: GuestProps) => {
  const { viewGuestInformation, isViewing } = useGetGuestInformation();
  const { isGetGuestReserveCount, isPending } = useGetGuestReserveCount();
  const [guestData, setGuestData] = useState<any>(null);
  const [reserveData, setReserveData] = useState<any>(null);

  const qrCodeRef = useRef(null);

  useEffect(() => {
    viewGuestInformation(
      { id: props.id },
      {
        onSuccess: (data) => {
          setGuestData(data);
        },
      }
    );
  }, [props.id, viewGuestInformation]);
  useEffect(() => {
    isGetGuestReserveCount(
      { userId: props.id },
      {
        onSuccess: (data: any) => {
          setReserveData(data);
        },
      }
    );
  }, [props.id, isGetGuestReserveCount]);
  console.log(guestData);
  return (
    <div>
      <Modal
        header={'Guest Details'}
        onOpen={props.onOpen}
        setOnOpen={props.setOnOpen}
        className="min-w-[800px] items-center"
      >
        {isViewing && <Loading size={25} />}
        {!isViewing && guestData && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center">
              <div className="grow">
                <h1 className="text-2xl">
                  {guestData?.firstName} {guestData?.lastName}
                </h1>
                <div className="flex flex-row gap-4 items-center">
                  <h4 className="text-sm capitalize">{guestData?.userType}</h4>
                  <h4 className="text-xs capitalize">
                    Company: {guestData?.company ? guestData.company : 'Individual'}
                  </h4>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <h4 className="text-sm italic text-slate-400">{guestData?.email}</h4>|
                  <h4 className="text-sm italic text-slate-400">{guestData?.guestInfo[0]?.contactNumber}</h4>
                </div>
              </div>
              <div className="flex-1">
                <div ref={qrCodeRef}>
                  <QRCodeCanvas
                    value={guestData?.userId}
                    size={150}
                    className="rounded border-10 border-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <div className="flex flex-col grow">
                <h1 className="text-2xl">Home Address</h1>

                <h4 className="text-sm">{guestData?.guestInfo[0]?.homeAddress},</h4>
                <h4 className="text-sm">{guestData?.guestInfo[0]?.streetName}</h4>
                <h4 className="text-sm">{guestData?.guestInfo[0]?.brgyAddress}</h4>
                <h4 className="text-sm">
                  {guestData?.guestInfo[0]?.municipalAddress}, {guestData?.guestInfo[0]?.provincialAddress}
                </h4>
              </div>
              <div className="flex-1 flex flex-col flex-wrap">
                <h4 className="text-sm">
                  Recent Reservations:{' '}
                  {!isPending &&
                    reserveData &&
                    reserveData.filter(
                      (item: { bookTracking: string }) =>
                        item.bookTracking === null && item.bookTracking === undefined
                    ).length}
                </h4>
                <h4 className="text-sm">
                  On-going Reservations:{' '}
                  {!isPending &&
                    reserveData &&
                    reserveData.filter((item: { bookTracking: string }) => item.bookTracking === 'checked in')
                      .length}{' '}
                </h4>
                <h4 className="text-sm">
                  Successful Reservations:{' '}
                  {!isPending &&
                    reserveData &&
                    reserveData.filter(
                      (item: { bookTracking: string }) => item.bookTracking === 'checked out'
                    ).length}{' '}
                </h4>
                <h4 className="text-sm">
                  Cancelled Reservations:{' '}
                  {!isPending &&
                    reserveData &&
                    reserveData.filter((item: { bookStatus: string }) => item.bookStatus === 'cancelled')
                      .length}{' '}
                </h4>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default Guest;
