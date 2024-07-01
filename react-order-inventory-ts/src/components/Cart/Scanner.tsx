import { Button } from '@/components/ui/button';
import { useCheckExistingCustomer } from '@/hooks/use/useCustomers';
import { useStore } from '@/store/store';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

interface ScannerProps {
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // setOnPoints: React.Dispatch<React.SetStateAction<any>>;
}

const Scanner = ({ setOnOpen }: ScannerProps) => {
  const { setDiscountDetails } = useStore(
    useShallow((state) => ({ setDiscountDetails: state.setDiscountDetails }))
  );
  const { checkCustomer, isCheckingCustomer } = useCheckExistingCustomer();
  const [scanResult, setScanResult] = useState(null);
  const [onError, setOnError] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      true
    );
    scanner.render(success, error);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function success(decodedResult: any) {
      scanner.clear;
      setScanResult(decodedResult);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function error(error: any) {
      console.warn(error);
    }
  }, []);

  const handleScanCode = (scanResult: string) => {
    setOnError(false);
    checkCustomer(scanResult, {
      onSuccess: (data) => {
        setDiscountDetails({
          email: data.csEmail,
          points: data.csRewardPoints,
        });

        setOnOpen(false);
        if (!data) {
          setOnError(true);
        }
      },
    });
  };
  return (
    <div className="p-4">
      {scanResult === null ? (
        <div id="reader" className="text-center m-auto"></div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {onError && <h2 className="text-center text-red-500">No Data Found</h2>}
          </div>
        </>
      )}
      <Button
        className="w-full"
        onClick={() => handleScanCode(scanResult ? scanResult : '')}
        disabled={isCheckingCustomer}
      >
        Scan QR
      </Button>
    </div>
  );
};
export default Scanner;
