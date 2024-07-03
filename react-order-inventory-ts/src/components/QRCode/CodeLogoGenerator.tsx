import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MutableRefObject, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCheckExistingCustomer, useGenerateQrCode } from '@/hooks/use/useCustomers';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const pinRegex = new RegExp(/^[0-9]{6}$/);

const CodeSchema = z.object({
  csEmail: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address')
    .min(1, 'Email is required'),
  csPin: z
    .string()
    .min(6, 'Pin must be 6 digits number')
    .max(6, 'Pin must be 6 digits number')
    .regex(pinRegex, 'Pin must be 6 digits number'),
});
const CodeLogoGenerator = () => {
  const ref = useRef<QRCode>();

  const [emailValue, setEmailValue] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [qrError, setQrError] = useState(false);
  const { checkCustomer, isCheckingCustomer } = useCheckExistingCustomer();
  const [notRegistered, setNotRegistered] = useState(false);
  const form = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      csEmail: '',
      csPin: '',
    },
  });

  const { generateQrCode, isGenerating } = useGenerateQrCode();
  const errorCatcher = qrError || notRegistered ? true : false;

  const handleGenerateQrCode = async (value: z.infer<typeof CodeSchema>) => {
    try {
      const dataUrl = value.csEmail;
      setNotRegistered(false);
      setQrError(false);
      checkCustomer(value.csEmail, {
        onSuccess: () => {
          generateQrCode(
            {
              email: value.csEmail,
              pin: value.csPin,
            },
            {
              onSuccess: () => {
                setEmailValue(`${value.csEmail.split('@')[0].toLowerCase()}.jpg`);
                setQrUrl(dataUrl);
              },
              onError: (error) => {
                setQrError(true);
                console.error(error);
              },
            }
          );
        },
        onError: () => {
          setNotRegistered(true);
        },
      });

      return;
    } catch (error) {
      console.error(error);
    }
  };

  const handleQrCodeDownload = () => {
    const qrCode = ref.current;
    qrCode?.download('jpg', emailValue);
  };

  const handleReset = () => {
    setEmailValue('');
    setQrUrl('');
    setQrError(false);
    setNotRegistered(false);
    form.reset();
  };

  return (
    <div>
      {!qrUrl && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleGenerateQrCode)}
            className="flex flex-col flex-wrap gap-4 min-w-72 max-w-80"
          >
            <FormField
              control={form.control}
              name="csEmail"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="csPin"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Pin</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Pin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="bg-orange-300" disabled={isGenerating || isCheckingCustomer}>
              {isGenerating || isCheckingCustomer ? 'Generating...' : 'Generate'}
            </Button>
            <div className="text-center text-red-500 text-xs font-semibold">
              {errorCatcher && 'QR Code could not be generated. Invalid Credentials.'}
            </div>
          </form>
        </Form>
      )}
      {qrUrl && (
        <div className="flex flex-col flex-wrap items-center justify-center gap-4">
          <QRCode
            ref={ref as MutableRefObject<QRCode>}
            size={300}
            value={qrUrl}
            logoImage="/felicitas_logo.png"
            fgColor={'#22c55e'}
            logoHeight={100}
            logoOpacity={1}
            logoWidth={100}
            logoPadding={-10}
            logoPaddingStyle="circle"
            quietZone={35}
            removeQrCodeBehindLogo={false}
            qrStyle="dots"
            eyeRadius={10}
            eyeColor={'#22c55e'}
          />
          <Button className="w-full bg-orange-300" type="button" onClick={() => handleQrCodeDownload()}>
            Download QR Code
          </Button>
          <Button className="w-full" variant="destructive" onClick={() => handleReset()}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default CodeLogoGenerator;
