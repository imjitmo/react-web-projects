import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { useUpdateAuthPassword } from '@/hooks/use/useStaff';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import * as z from 'zod';

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const UpdatePasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Must be at least 8 characters')
      .max(32, 'Must be at most 24 characters')
      .regex(passwordValidation, {
        message: 'Must contain at least one uppercase, one lowercase, one number and one special character',
      }),
    confirmPassword: z
      .string({
        required_error: 'Confirm Password is required',
      })
      .min(8, 'Must be at least 8 characters')
      .max(32, 'Must be at most 24 characters')
      .regex(passwordValidation, {
        message: 'Must contain at least one uppercase, one lowercase, one number and one special character',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
const UpdatePassword = ({ setOnOpen }: { setOnOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { updateAuthPassword, isUpdating } = useUpdateAuthPassword();
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChangePassword = async (data: z.infer<typeof UpdatePasswordSchema>) => {
    updateAuthPassword(
      {
        password: data.password,
      },
      {
        onSuccess: () => {
          setOnOpen(false);
          form.reset();
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleChangePassword)} className="flex flex-col gap-4">
        <div className="flex flex-col flex-wrap gap-2 items-center">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    {/* <Input type="password" placeholder="Password" {...field} />
                    <Button type="button" size="icon">
                      <FaRegEye />
                    </Button> */}
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <FaRegEye className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <FaRegEyeSlash className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                      </Button>

                      {/* hides browsers password toggles */}
                      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
                    </div>
                  </FormControl>
                  <FormMessage className="max-w-[260px]" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    {/* <Input type="password" placeholder="Password" {...field} />
                    <Button type="button" size="icon">
                      <FaRegEye />
                    </Button> */}
                    <div className="relative">
                      <Input type={showConfirmPassword ? 'text' : 'password'} {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <FaRegEye className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <FaRegEyeSlash className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>

                      {/* hides browsers password toggles */}
                      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
                    </div>
                  </FormControl>
                  <FormMessage className="max-w-[260px]" />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          <Button className="grow bg-orange-500" disabled={isUpdating}>
            Update
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setOnOpen(false);
              form.reset();
            }}
            disabled={isUpdating}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UpdatePassword;
