import QrCode from 'qrcode';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCheckExistingCustomer, useGenerateQrCode } from '@/hooks/use/useCustomers';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const pinRegex = new RegExp(/^[0-9]{6}$/);

const CodeSchema = z.object({
  email: z
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

const CodeGenerator = () => {
  const [emailValue, setEmailValue] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [qrError, setQrError] = useState(false);
  const { checkCustomer, isCheckingCustomer } = useCheckExistingCustomer();
  const [notRegistered, setNotRegistered] = useState(false);
  const form = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      email: '',
      csPin: '',
    },
  });

  const { generateQrCode, isGenerating } = useGenerateQrCode();

  const handleGenerateQrCode = async (value: z.infer<typeof CodeSchema>) => {
    try {
      const dataUrl = await QrCode.toDataURL(value.email);
      setNotRegistered(false);
      setQrError(false);
      checkCustomer(value.email, {
        onSuccess: () => {
          generateQrCode(
            {
              email: value.email,
              pin: value.csPin,
            },
            {
              onSuccess: () => {
                setEmailValue(value.email.split('@')[0].toLowerCase());
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
  return (
    <>
      {!qrUrl && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGenerateQrCode)} className="flex flex-col gap-4 min-w-72">
            <FormField
              control={form.control}
              name="email"
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
            {qrError && (
              <div className="text-red-500 text-xs">QR Code could not be generated. Invalid Credentials.</div>
            )}
            {notRegistered && (
              <div className="text-red-500 text-xs">
                QR Code could not be generated. Account does not exist.
              </div>
            )}
          </form>
        </Form>
      )}

      {qrUrl && (
        <div className="flex flex-col gap-2 flex-wrap">
          <img src={qrUrl} width={'300'} alt="qr-code" />
          <a
            className="bg-green-500 p-2 rounded-lg text-slate-50 hover:bg-orange-300 text-center font-semibold text-sm"
            download={`${emailValue}_qr_code.png`}
            href={qrUrl}
          >
            Download QR Code
          </a>
          <Button
            variant={'destructive'}
            onClick={() => {
              setQrUrl('');
              form.reset();
            }}
          >
            Reset
          </Button>
        </div>
      )}
    </>
  );
};
export default CodeGenerator;
