/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from '@/components/Spinner/Loader';
import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useUpdateBookingStatus, useViewCustomerReservation } from '@/hooks/use/useReservation';

import { differenceInDays } from 'date-fns';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaDownload, FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

interface ViewReservationProps {
  id: string;
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const View = (props: ViewReservationProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // const [onOpen, setOnOpen] = useState(false);
  const qrCodeRef = useRef(null);
  // const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setOnOpen((prev) => !prev);
  // };
  const { editBookingStatus, isLoading } = useUpdateBookingStatus();
  const [onAsk, setOnAsk] = useState(false);
  const [list, setList] = useState<any>(null);
  const { viewReservation, isViewing } = useViewCustomerReservation();

  useEffect(() => {
    viewReservation(
      { id: props.id },
      {
        onSuccess: (data) => {
          setList(data);
        },
      }
    );
  }, [props.id, viewReservation]);

  const totalExtras =
    list && !isViewing && list.amenities.reduce((a: any, b: { price: any }) => a + b.price, 0);
  const totalDaysCost =
    list &&
    !isViewing &&
    differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) * list.tblRooms.roomPrice;

  const handleClickStatusCancelled = () => {
    editBookingStatus(
      { id: list.id, bookStatus: list.bookStatus === 'pending' ? 'cancelled' : 'request' },
      {
        onSuccess: () => {
          props.setOnOpen(false);
        },
      }
    );
  };

  const handleTransaction = async () => {
    await handleClickStatusCancelled();
    setOnAsk(false);
    return;
  };

  const exportPDF = () => {
    const input = document.getElementById('pdfPage') as HTMLElement;
    html2canvas(input, { logging: true, useCORS: true }).then((canvas) => {
      const imgWidth = 240;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'letter');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`${list && list.id}.pdf`);
    });
  };
  return (
    <div>
      {/* <span onClick={handleOpenModal}>View Booking details</span> */}
      <Modal onOpen={props.onOpen} setOnOpen={props.setOnOpen} className="min-w-[800px]">
        {isViewing && <Loader />}
        {!isViewing && list && (
          <div className="flex flex-col">
            <div className="flex flex-row justify-end items-end content-end w-full gap-2">
              <Tiptools title="Print Confirmation" titleClassName="text-slate-950 dark:text-slate-50">
                <button
                  onClick={reactToPrintFn}
                  className="bg-blue-950 text-slate-50 cursor-pointer hover:bg-blue-700 rounded-full flex flex-row gap-2 items-center justify-center py-2 px-4"
                >
                  <FaPrint className="size-5" />
                </button>
              </Tiptools>
              <Tiptools title="Download Confirmation" titleClassName="text-slate-950 dark:text-slate-50">
                <button
                  className="bg-blue-950 text-slate-50 cursor-pointer hover:bg-blue-700 rounded-full flex flex-row gap-2 items-center justify-center py-2 px-4"
                  onClick={exportPDF}
                >
                  <FaDownload className="size-5" />
                </button>
              </Tiptools>
            </div>
            <div id="pdfPage" ref={contentRef} className="flex flex-col justify-center gap-4 px-8 ">
              {/* here */}
              <div className="text-center">
                <h1 className="text-2xl font-bold">Reservation Details</h1>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col grow">
                  <h2 className="text-xl font-bold">Guest Details</h2>
                  <h2>Reservation ID: #{list.id.substring(0, 8).toUpperCase()}</h2>
                  <h2>Guest Name: {list.userName}</h2>
                </div>
                <div ref={qrCodeRef}>
                  <QRCodeCanvas value={list.id} size={120} className="rounded border-10 border-slate-50" />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-bold">Room Details</h2>
                  <h2>Room Name: {list.tblRooms.roomName}</h2>
                  <h2>Room Number: {list.tblRooms.roomNumber}</h2>
                  <h2>Room Price: {CurrencyFormatter(list.tblRooms.roomPrice)}</h2>
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-bold">Booking Details</h2>
                  <h2>Check In: {list.checkIn}</h2>
                  <h2>Check Out: {list.checkOut}</h2>
                  <h2>Number of Days: {differenceInDays(new Date(list.checkOut), new Date(list.checkIn))}</h2>
                  <h2 className="capitalize">Reservation Status: {list.bookStatus}</h2>
                  <h2 className="capitalize">
                    Total Price on Stay:{' '}
                    {CurrencyFormatter(
                      differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) *
                        list.tblRooms.roomPrice
                    )}
                  </h2>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-bold">Extras</h2>
                  {list.amenities.map(
                    (amenity: {
                      service:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<unknown, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<unknown, string | JSXElementConstructor<any>>
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      price: number;
                    }) => (
                      <h2>
                        {amenity.service}: {CurrencyFormatter(amenity.price)}
                      </h2>
                    )
                  )}
                  Total Extra Charges:{' '}
                  {CurrencyFormatter(
                    list.amenities.reduce((acc: any, curr: { price: any }) => acc + curr.price, 0)
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-bold">Total Charges</h2>
                  <h1 className="text-2xl font-bold">{CurrencyFormatter(totalDaysCost + totalExtras)}</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-end items-end">
              {!onAsk && !list.bookTracking && list.bookStatus !== 'cancelled' && (
                <div className="flex flex-row gap-2">
                  <Button
                    className="w-[150px] bg-red-600"
                    onClick={() => setOnAsk((prev) => !prev)}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loading size={20} /> : 'Cancel'}
                  </Button>
                </div>
              )}
              {onAsk && (
                <div className="flex flex-row gap-2 items-center">
                  <span className="italic">Are you sure?</span>
                  <Button className="w-[150px] bg-red-600" onClick={handleTransaction}>
                    Yes
                  </Button>
                  <Button className="w-[300px] bg-green-600" onClick={() => setOnAsk(false)}>
                    No
                  </Button>
                </div>
              )}
            </div>
            {/* here */}
          </div>
        )}
      </Modal>
    </div>
  );
};
export default View;
