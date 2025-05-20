/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from '@/components/Spinner/Loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useViewCustomerReservation } from '@/hooks/use/useReservation';
import { useStore } from '@/store/store';
import { differenceInDays } from 'date-fns';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
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
  const { viewReservation, isViewing } = useViewCustomerReservation();
  const contentRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef(null);
  const { displayName, signature } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
      signature: state.signature,
    }))
  );
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
  return (
    <div>
      <Modal onOpen={props.onOpen} setOnOpen={props.setOnOpen} className="min-w-[1000px]">
        {isViewing && <Loader />}
        {list && !isViewing && (
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
                  <h3 className="text-md">
                    <span className="font-bold">Date:</span> {new Date().toDateString()}
                  </h3>
                  <h3 className="text-md">
                    <span className="font-bold">Invoice:</span> #{list.id.substring(0, 8).toUpperCase()}
                  </h3>
                </div>
                <div className="">
                  <div ref={qrCodeRef}>
                    <QRCodeCanvas value={list.id} size={150} className="rounded border-10 border-slate-50" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-bold">Guest Information</h2>
                  <h3 className="text-md">
                    <span className="font-bold">Name: </span> {list.userName}
                  </h3>
                  <h3 className="text-md">
                    <span className="font-bold">Address: </span> -
                  </h3>
                  <h3 className="text-md">
                    <span className="font-bold">Contact: </span> -
                  </h3>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold">Room Information</h2>
                  <h3 className="text-md">
                    <span className="font-bold">Room Number: </span> {list.tblRooms.roomNumber}
                  </h3>
                  <h3 className="text-md">
                    <span className="font-bold">Room Name: </span> {list.tblRooms.roomName}
                  </h3>
                  <h3 className="text-md">
                    <span className="font-bold">Price: </span> {CurrencyFormatter(list.tblRooms.roomPrice)}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Service</TableHead>
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
                        <TableRow key={index}>
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
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-1 flex-2">
                  <h3 className="font-lg font-bold">Terms of Conditions:</h3>
                  <p className="text-sm text-justify">
                    All prices are subject to change without notice. Payment is due upon arrival.
                    Cancellations must be made 48 hours in advance to avoid charges. For any inquiries, please
                    contact Softnet Hotel Desk at softnethotel@gmail.com.
                  </p>
                </div>
                <div className="flex flex-col flex-1 justify-end items-end gap-2">
                  <h3 className="text-md">
                    <span className="font-bold">Total:</span>{' '}
                    {CurrencyFormatter(
                      list.amenities.reduce(
                        (total: any, amenity: { price: any }) => total + amenity.price,
                        0
                      ) +
                        list.tblRooms.roomPrice *
                          differenceInDays(new Date(list.checkOut), new Date(list.checkIn))
                    )}
                  </h3>
                  <h1 className="text-md font-bold">
                    Payment Method: <span className="capitalize font-normal">{list.paymentType}</span>
                  </h1>
                </div>
              </div>
              <div className="flex flex-col w-full gap">
                <div className="flex flex-col text-center items-end">
                  <div className="flex flex-col min-w-[200px] max-w-[200px]">
                    <div className="pb-1">
                      <img src={signature ? signature : ''} className="w-full h-16" alt="" />
                    </div>
                    <span className="border-b border-slate-500"></span>
                    <span className="text-sm">
                      {displayName} <span className="capitalize font-normal">{list.paymentStatus}</span>
                    </span>
                    <span className="text-sm italic">Staff</span>
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
