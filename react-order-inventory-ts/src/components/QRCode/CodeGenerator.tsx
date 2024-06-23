import QrCode from 'qrcode';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGenerateQrCode } from '@/hooks/use/useCustomers';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const CodeSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address')
    .min(1, 'Email is required'),
});

const CodeGenerator = () => {
  const [emailValue, setEmailValue] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [qrError, setQrError] = useState(false);
  const form = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      email: '',
    },
  });

  const { generateQrCode, isGenerating } = useGenerateQrCode();

  const handleGenerateQrCode = async (value: z.infer<typeof CodeSchema>) => {
    try {
      setQrError(false);
      const dataUrl = await QrCode.toDataURL(value.email);

      generateQrCode(value.email, {
        onSuccess: () => {
          setEmailValue(value.email.split('@')[0].toLowerCase());
          setQrUrl(dataUrl);
        },
        onError: (error) => {
          setQrError(true);
          console.error(error);
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
          <form onSubmit={form.handleSubmit(handleGenerateQrCode)} className="flex flex-col gap-4">
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
                    {qrError && (
                      <div className="text-red-500">
                        QR Code could not be generated. Email does not exist.
                      </div>
                    )}
                  </FormItem>
                );
              }}
            />
            <Button className="bg-orange-300" disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
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