/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from '@/components/Spinner/Loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useGetGuestExtras, useViewCustomerReservation } from '@/hooks/use/useReservation';
import { useGetGuestInformation } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { differenceInDays } from 'date-fns';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaDownload, FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import { useShallow } from 'zustand/react/shallow';

interface ViewInvoiceProps {
  id: string;
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Invoice = (props: ViewInvoiceProps) => {
  const [list, setList] = useState<any>(null);
  const [guest, setGuest] = useState<any>(null);
  const [extras, setExtras] = useState<any>(null);
  const { viewReservation, isViewing } = useViewCustomerReservation();
  const { viewGuestExtras, isPending } = useGetGuestExtras();
  const { viewGuestInformation, isViewing: isGuestViewing } = useGetGuestInformation();
  const contentRef = useRef<HTMLDivElement>(null);
  const { displayName, signature, userType } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
      signature: state.signature,
      userType: state.userType,
    }))
  );
  useEffect(() => {
    viewReservation(
      { id: props.id },
      {
        onSuccess: (data) => {
          setList(data);
          viewGuestInformation(
            { id: data.userId },
            {
              onSuccess: (data) => {
                setGuest(data);
              },
              onError: () => {
                setGuest(null);
              },
            }
          );
        },
      }
    );
  }, [props.id, viewReservation, viewGuestInformation]);

  useEffect(() => {
    viewGuestExtras(
      { reserveId: props.id },
      {
        onSuccess: (data) => {
          setExtras(data);
        },
      }
    );
  }, [props.id, viewGuestExtras]);

  const reactToPrintFn = useReactToPrint({ contentRef });

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

  const amenitiesTotal = list?.amenities.reduce(
    (total: any, amenity: { price: any }) => total + amenity.price,
    0
  );
  const stayInTotal =
    list?.tblRooms.roomPrice * differenceInDays(new Date(list?.checkOut), new Date(list?.checkIn));
  const extrasTotalPerQty = extras
    ?.map((items: any) => items.extrasPrice * items.extrasQty)
    .reduce((a: any, b: any) => a + b, 0);
  const total = amenitiesTotal + stayInTotal + extrasTotalPerQty;
  return (
    <div>
      <Modal onOpen={props.onOpen} setOnOpen={props.setOnOpen} className="min-w-[1000px]">
        {isViewing && isGuestViewing && <Loader />}
        {list && !isViewing && !isGuestViewing && (
          <>
            <div className="flex flex-row justify-end items-end content-end w-full gap-2">
              <Tiptools title="Print Invoice" titleClassName="text-slate-950 dark:text-slate-50">
                <button
                  onClick={reactToPrintFn}
                  className="bg-blue-950 text-slate-50 cursor-pointer hover:bg-blue-700 rounded-full flex flex-row gap-2 items-center justify-center py-2 px-4"
                >
                  <FaPrint className="size-5" />
                </button>
              </Tiptools>
              <Tiptools title="Download Invoice" titleClassName="text-slate-950 dark:text-slate-50">
                <button
                  className="bg-blue-950 text-slate-50 cursor-pointer hover:bg-blue-700 rounded-full flex flex-row gap-2 items-center justify-center py-2 px-4"
                  onClick={exportPDF}
                >
                  <FaDownload className="size-5" />
                </button>
              </Tiptools>
            </div>
            <div id="pdfPage" ref={contentRef} className="flex flex-col justify-center gap-4 px-8 ">
              <style type="text/css" media="print">
                {' @page { size: landscape; } '}
              </style>

              <div className="flex flex-row">
                <div className="grow">
                  <h1 className="text-2xl font-bold">SOFTNET Hotel</h1>
                </div>
                <div className="mt-4">
                  <h1 className="text-2xl font-bold">INVOICE</h1>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col grow">
                  <h3 className="text-sm">
                    <span className="font-bold">Date:</span> {new Date().toDateString()}
                  </h3>
                  <h3 className="text-sm">
                    <span className="font-bold">Invoice:</span> #{list.id.substring(0, 8).toUpperCase()}
                  </h3>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-bold">Guest Information</h2>
                  <h3 className="text-sm">
                    <span className="font-bold">Name: </span>{' '}
                    {guest ? guest.firstName + ' ' + guest.lastName : list.userName}
                  </h3>
                  {guest?.company && (
                    <h3 className="text-sm font-normal">
                      <span className="font-bold">Company: </span> {guest?.company}
                    </h3>
                  )}
                  <h3 className="text-sm">
                    <span className="font-bold">Address: </span>{' '}
                    {guest?.guestInfo[0]
                      ? guest?.guestInfo[0].homeAddress +
                        ', ' +
                        guest?.guestInfo[0].streetName +
                        ', ' +
                        guest?.guestInfo[0].municipalAddress +
                        ', ' +
                        guest?.guestInfo[0].provincialAddress +
                        ', ' +
                        guest?.guestInfo[0].regionalAddress
                      : '-'}
                  </h3>
                  <h3 className="text-sm">
                    <span className="font-bold">Contact: </span>{' '}
                    {guest?.guestInfo[0] ? guest?.guestInfo[0].contactNumber : '-'}
                  </h3>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">Room Information</h2>
                  <h3 className="text-sm">
                    <span className="font-bold">Room Number: </span> {list.tblRooms.roomNumber}
                  </h3>
                  <h3 className="text-sm">
                    <span className="font-bold">Room Name: </span> {list.tblRooms.roomName}
                  </h3>
                  <h3 className="text-sm">
                    <span className="font-bold">Price: </span> {CurrencyFormatter(list.tblRooms.roomPrice)}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap flex-col gap-1">
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead># of Days</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Room Rent</TableCell>

                      <TableCell>{CurrencyFormatter(list.tblRooms.roomPrice)}</TableCell>
                      <TableCell>
                        {differenceInDays(new Date(list.checkOut), new Date(list.checkIn))}
                      </TableCell>
                      <TableCell className="text-right">
                        {CurrencyFormatter(
                          differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) *
                            list.tblRooms.roomPrice
                        )}
                      </TableCell>
                    </TableRow>
                    {list.amenities.map(
                      (
                        amenity: {
                          service:
                            | boolean
                            | Key
                            | ReactElement<unknown, string | JSXElementConstructor<any>>
                            | Iterable<ReactNode>
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
                        },
                        index: number
                      ) => (
                        <TableRow key={index + 1}>
                          <TableCell className="font-medium">{amenity.service}</TableCell>
                          <TableCell>{CurrencyFormatter(amenity.price)}</TableCell>
                          <TableCell>
                            {differenceInDays(new Date(list.checkOut), new Date(list.checkIn))}
                          </TableCell>
                          <TableCell className="text-right">
                            {CurrencyFormatter(
                              differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) *
                                amenity.price
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
                {!isPending && extras.length > 0 && (
                  <div className="w-[400px]">
                    <h4 className="text-sm font-bold">Extras</h4>
                    <Table>
                      <TableBody>
                        {!isPending &&
                          extras &&
                          extras.map((items: any) => (
                            <TableRow className="font-xs">
                              <TableCell>{items.extrasName}</TableCell>
                              <TableCell>{items.extrasPrice}</TableCell>
                              <TableCell>{items.extrasQty}</TableCell>
                              <TableCell className="text-right">
                                {CurrencyFormatter(items.extrasPrice * items.extrasQty)}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-1 flex-2">
                  <h3 className="font-md font-bold">Terms of Conditions:</h3>
                  <p className="text-xs text-justify">
                    All prices are subject to change without notice. Payment is due upon arrival.
                    Cancellations must be made 48 hours in advance to avoid charges. For any inquiries, please
                    contact Softnet Hotel Desk at softnethotel@gmail.com.
                  </p>
                </div>
                <div className="flex flex-col flex-1 justify-end items-end gap-2">
                  <h3 className="text-sm">
                    <span className="font-bold">Total:</span> {CurrencyFormatter(total)}
                  </h3>
                  <h1 className="text-sm font-bold">
                    Payment Method: <span className="capitalize font-normal">{list.paymentType}</span>
                  </h1>
                </div>
              </div>
              <div className="flex flex-col w-full gap">
                <div className="flex flex-row">
                  {/* guest signature */}
                  <div className="flex flex-col grow">
                    <div className="flex flex-col text-center">
                      <div className="flex flex-col min-w-[200px] max-w-[200px]">
                        <div className="pb-1">
                          <div className="w-full  h-16"></div>
                        </div>
                        <span className="border-b border-slate-500"></span>
                        <span className="text-sm">
                          {list.userName} <span className="capitalize font-normal">{list.paymentStatus}</span>
                        </span>
                        <span className="text-sm italic">Guest</span>
                      </div>
                    </div>
                  </div>

                  {/* staff signature */}
                  <div className="flex flex-col text-center">
                    <div className="flex flex-col min-w-[200px] max-w-[200px]">
                      <div className="pb-1">
                        <img src={signature ? signature : ''} className="w-full h-16" alt="" />
                      </div>
                      <span className="border-b border-slate-500"></span>
                      <span className="text-sm">
                        {displayName} <span className="capitalize font-normal">{list.paymentStatus}</span>
                      </span>
                      <span className="text-sm italic">{userType === 'staff' ? 'Student' : 'Trainer'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600/50 italic text-sm text-center">
                  © 2025 FOSSH | Front Office System with QR Technology
                </p>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
export default Invoice;
