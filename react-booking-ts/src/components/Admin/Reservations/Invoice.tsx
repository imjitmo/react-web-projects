import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { differenceInDays } from 'date-fns';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import { FaDownload, FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

interface ViewInvoiceProps {
  id: string;
  userName: string;
  roomId: string;
  bookStatus: string;
  checkIn: string;
  checkOut: string;
  bookTracking: string;
  amenities: { service: string; price: number }[];
  tblRooms: {
    roomName: string;
    roomNumber: string;
    roomPrice: number;
  };
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Invoice = (list: ViewInvoiceProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef(null);

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
      pdf.save(`${list.id}.pdf`);
    });
  };
  return (
    <div>
      <Modal onOpen={list.onOpen} setOnOpen={list.setOnOpen} className="min-w-[900px]">
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
        <div id="pdfPage" ref={contentRef} className="flex flex-col justify-center gap-4 px-8 pt-8">
          <style type="text/css" media="print">
            {' @page { size: landscape; } '}
          </style>

          <div className="flex flex-row-gap-4">
            <div className="grow">
              <h1 className="text-2xl font-bold">SOFTNET Hotel</h1>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold">INVOICE</h1>
            </div>
          </div>
          <div className="flex flex-row gap-4">
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
          <div className="flex flex-row gap-4">
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
                  <TableCell>{differenceInDays(new Date(list.checkOut), new Date(list.checkIn))}</TableCell>
                  <TableCell className="text-right">
                    {CurrencyFormatter(
                      differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) *
                        list.tblRooms.roomPrice
                    )}
                  </TableCell>
                </TableRow>
                {list.amenities.map((amenity) => (
                  <TableRow key={amenity.service}>
                    <TableCell className="font-medium">{amenity.service}</TableCell>
                    <TableCell>{CurrencyFormatter(amenity.price)}</TableCell>
                    <TableCell>{differenceInDays(new Date(list.checkOut), new Date(list.checkIn))}</TableCell>
                    <TableCell className="text-right">
                      {CurrencyFormatter(
                        differenceInDays(new Date(list.checkOut), new Date(list.checkIn)) * amenity.price
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-row gap-4">
            <div className="grow"></div>
            <div className="flex flex-row">
              <h3 className="text-md">
                <span className="font-bold">Total:</span>{' '}
                {CurrencyFormatter(
                  list.amenities.reduce((total, amenity) => total + amenity.price, 0) +
                    list.tblRooms.roomPrice *
                      differenceInDays(new Date(list.checkOut), new Date(list.checkIn))
                )}
              </h3>
            </div>
          </div>
          <div className="flex flex-col w-full gap-8">
            <div className="flex flex-col gap-1">
              <h3 className="font-lg font-bold">Terms of Conditions:</h3>
              <p className="text-sm text-justify">
                All prices are subject to change without notice. Payment is due upon arrival. Cancellations
                must be made 48 hours in advance to avoid charges. For any inquiries, please contact Softnet
                Hotel Desk at softnethotel@gmail.com.
              </p>
            </div>
            <p className="text-slate-600/50 italic text-sm text-center">
              © 2025 FOSSH | Front Office System with QR Technology
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Invoice;
