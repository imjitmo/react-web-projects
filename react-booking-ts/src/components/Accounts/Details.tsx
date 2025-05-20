import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegisterUser } from '@/hooks/use/useUsers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useStore } from '@/store/store';
import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

import Loading from '../Spinner/Loading';
import Modal from '../UiHooks/Modal';

const SignUpSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(1, 'First Name is required'),
  middleName: z.string().optional(),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .min(1, 'Last Name is required'),
});

const Details = () => {
  const [onOpen, setOnOpen] = useState(false);
  const { isLoading } = useRegisterUser();
  const { displayName, userType } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
      userType: state.userType,
    }))
  );

  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
  };
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  // const handleSubmit = async (values: z.infer<typeof SignUpSchema>) => {
  //   isRegisterUser(
  //     {
  //       ...values,
  //       userType: 'guest',
  //     },
  //     {
  //       onSuccess: (data) => {
  //         console.log(data);
  //       },
  //     }
  //   );
  // };

  return (
    <>
      <div className="flex flex-col cursor-pointer" onClick={() => setOnOpen((prev) => !prev)}>
        <p>{displayName}</p>
        <p className="capitalize text-slate-400 text-sm">{userType}</p>
      </div>
      <Modal header={'Update Details'} onOpen={onOpen} setOnOpen={setOnOpen}>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Middle Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField> */}

            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          className="text-slate-950"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-950"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <FaRegEyeSlash className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <FaRegEye className="h-4 w-4" aria-hidden="true" />
                          )}
                          <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>

            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Repeat Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField> */}
            <div className="w-full flex flex-row flex-wrap gap-2 justify-end">
              <Button
                className="flex flex-row gap-2 flex-wrap bg-blue-950 hover:bg-yellow-400 text-slate-50 hover:text-slate-950 cursor-pointer px-12"
                disabled={isLoading}
              >
                {isLoading ? <Loading size={20} /> : 'Update'}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default Details;
