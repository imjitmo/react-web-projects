import View from '@/components/Admin/Scan/View';
import Loader from '@/components/Spinner/Loader';
import { Button } from '@/components/ui/button';
import { useViewCustomerReservation } from '@/hooks/use/useReservation';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useEffect, useState } from 'react';

const Scanner = () => {
  const [scanResult, setScanResult] = useState('');
  const { viewReservation, isViewing } = useViewCustomerReservation();
  const [onView, setOnView] = useState(false);
  const [onGuestData, setOnGuestData] = useState<{
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
    created_at: Date;
  } | null>(null);
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname !== '/scan') return;
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA, Html5QrcodeScanType.SCAN_TYPE_FILE],
      },
      false
    );
    scanner.render(success, error);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function success(decodedResult: any) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      scanner.clear;
      setScanResult(decodedResult);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function error(error: any) {
      console.warn(error);
    }
  }, [pathname]);

  const handleScanCode = () => {
    if (scanResult) {
      viewReservation(
        { id: scanResult },
        {
          onSuccess: (data) => {
            setOnGuestData({ ...data });
            setOnView(true);
          },
        }
      );
    }
  };
  return (
    <div className="p-4">
      {scanResult && !onView ? (
        <div className="flex flex-col gap-4 items-center justify-center p-4">
          <Button onClick={handleScanCode}>View Result </Button>
        </div>
      ) : (
        !onView && <div id="reader" className="w-[300px] h-[300px] text-center m-auto"></div>
      )}
      {isViewing && <Loader />}
      {onView && onGuestData && !isViewing && (
        <View setOnView={setOnView} scanResult={scanResult} setScanResult={setScanResult} {...onGuestData} />
      )}
    </div>
  );
};
export default Scanner;
