import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useViewCustomerPoints } from '@/hooks/use/useCustomers';
import { useStore } from '@/store/store';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const pinRegex = new RegExp(/^[0-9]{6}$/);

const CodeSchema = z.object({
  csPin: z
    .string()
    .min(6, 'Pin must be 6 digits number')
    .max(6, 'Pin must be 6 digits number')
    .regex(pinRegex, 'Pin must be 6 digits number'),
});

interface ScannerProps {
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // setOnPoints: React.Dispatch<React.SetStateAction<any>>;
}

const Scanner = ({ setOnOpen }: ScannerProps) => {
  const { setDiscountDetails } = useStore(
    useShallow((state) => ({ setDiscountDetails: state.setDiscountDetails }))
  );
  const { viewPoints, isViewing } = useViewCustomerPoints();
  const [scanResult, setScanResult] = useState(null);
  const [onError, setOnError] = useState(false);
  const form = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      csPin: '',
    },
  });

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

  const handleScanCode = () => {
    setOnError(false);
    viewPoints(
      { email: scanResult || '', pin: '123456' },
      {
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
      }
    );
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
      {scanResult && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleScanCode)}
            className="flex flex-col flex-wrap gap-4 min-w-72 max-w-80 p-2"
          >
            <FormField
              control={form.control}
              name="csPin"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Confirm your Pin</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm Pin Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="w-full" onClick={() => handleScanCode()} disabled={isViewing}>
              {isViewing ? 'Scanning...' : 'Scan QR Code'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
export default Scanner;
