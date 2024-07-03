import { Button } from '@/components/ui/button';
import { useViewCustomerPoints } from '@/hooks/use/useCustomers';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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

const CodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [onError, setOnError] = useState(false);
  const [confirmPin, setConfirmPin] = useState(false);
  const { viewPoints, isViewing } = useViewCustomerPoints();
  const [confirmData, setConfirmData] = useState(false);
  const [viewData, setViewData] = useState<{
    csEmail: string;
    csFirstName: string;
    csLastName: string;
    csRewardPoints: number;
  } | null>(null);

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
      setConfirmPin(true);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function error(error: any) {
      console.warn(error);
    }
  }, []);

  const handleScanCode = (values: z.infer<typeof CodeSchema>) => {
    setOnError(false);
    setConfirmData(false);
    if (scanResult) {
      viewPoints(
        { email: scanResult, pin: values.csPin },
        {
          onSuccess: (data) => {
            setConfirmData(true);
            setViewData(data);
          },
          onError: () => {
            setOnError(true);
          },
        }
      );
      return;
    }
    setConfirmPin(false);
    return;
  };

  return (
    <div className="p-4">
      {scanResult === null ? (
        <div id="reader" className="text-center m-auto"></div>
      ) : (
        <>
          <div className="flex flex-col gap-2 m-auto p-4">
            {viewData && (
              <div className="flex flex-col gap-2 m-auto p-2">
                <p className="text-xs">
                  Email: <span className="text-green-500 italic">{viewData.csEmail}</span>
                </p>
                <p className="text-xs">
                  Name:{' '}
                  <span className="text-green-500 italic">
                    {viewData.csFirstName} {viewData.csLastName}
                  </span>
                </p>
                <p className="text-xs">
                  Reward Points: <span className="text-green-500 italic">{viewData.csRewardPoints}</span>
                </p>
              </div>
            )}
            {onError && <h2 className="text-center text-red-500">No Data Found</h2>}
            {confirmPin && !confirmData && (
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
                  <Button className="w-full" disabled={isViewing}>
                    {isViewing ? 'Confirming...' : 'Confirm Pin'}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default CodeScanner;
