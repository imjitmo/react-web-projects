import { Button } from '@/components/ui/button';
import { useViewCustomerPoints } from '@/hooks/use/useCustomers';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

const CodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [onError, setOnError] = useState(false);
  const { viewPoints } = useViewCustomerPoints();
  const [viewData, setViewData] = useState<{
    csEmail: string;
    csFirstName: string;
    csLastName: string;
    csRewardPoints: number;
  } | null>(null);

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
    if (scanResult) {
      viewPoints(scanResult, {
        onSuccess: (data) => {
          setViewData(data);
          if (!data) {
            setOnError(true);
          }
        },
      });
    }
  };

  return (
    <div className="p-4">
      {scanResult === null ? (
        <div id="reader" className="text-center m-auto"></div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {viewData && (
              <>
                <p>Email: {viewData.csEmail}</p>
                <p>
                  Name: {viewData.csFirstName} {viewData.csLastName}
                </p>
                <p>Reward Points: {viewData.csRewardPoints}</p>
              </>
            )}
            {onError && <h2 className="text-center text-red-500">No Data Found</h2>}
            <Button className="w-full" onClick={() => handleScanCode(scanResult)}>
              View Data
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default CodeScanner;
