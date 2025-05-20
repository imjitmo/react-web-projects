/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegisterUser, useUserLogin } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash, FaSpinner } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const SignUpSchema = z
  .object({
    company: z.string().optional(),
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
    email: z
      .string({
        required_error: 'Email is required',
      })
      .min(1, 'Email is required')
      .email({
        message: 'Must be a valid email',
      }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Must be at least 8 characters')
      .max(24, 'Must be at most 24 characters')
      .regex(passwordValidation, {
        message: 'Must contain at least one uppercase, one lowercase, one number and one special character',
      }),
    repeatPassword: z
      .string({
        required_error: 'Repeat password is required',
      })
      .min(1, 'Repeat password is required'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

interface SignupProps {
  setAuthenticationType: (value: string) => void;
}

const initialValues = {
  company: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
};
const Signup = ({ setAuthenticationType }: SignupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isRegisterUser, isLoading } = useRegisterUser();
  const { userId, userType, setUserLoginData } = useStore(
    useShallow((state) => ({
      userId: state.userId,
      userType: state.userType,
      setUserLoginData: state.setUserLoginData,
    }))
  );
  const { isLoginUser } = useUserLogin();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const handleZustandLoginData = (data: any) => {
    setUserLoginData({
      userId: data.userId,
      email: data.user.email,
      displayName: `${data.firstName} ${data.lastName}`,
      userType: data.userType,
      photo: data.photo,
      signature: data.signature,
    });
  };

  const handleSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    isRegisterUser(
      {
        ...values,
        userType: 'guest',
      },
      {
        onSuccess: () => {
          isLoginUser(
            {
              email: values.email,
              password: values.password,
            },
            {
              onSuccess: (data) => {
                handleZustandLoginData(data);
              },
            }
          );
        },
      }
    );
    // console.log(values);
  };

  useEffect(() => {
    if (userId) {
      if (userType === 'guest') {
        navigate('/profile');
      } else {
        navigate('/dashboard');
      }
    }
  }, [userId, userType, navigate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>
                  Company Name <span className="text-xs italic">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
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
        <FormField
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
        ></FormField>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-slate-900">Password</FormLabel>
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
                        <FaRegEye className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <FaRegEyeSlash className="h-4 w-4" aria-hidden="true" />
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
        ></FormField>
        <div className="w-full flex flex-row flex-wrap gap-2">
          <Button
            type="button"
            className="bg-yellow-400 hover:bg-blue-950 text-slate-950 hover:text-slate-50"
            onClick={() => setAuthenticationType('signin')}
          >
            <IoMdArrowRoundBack className="text-center size-[1.25rem]" />
          </Button>
          <Button
            className="grow flex flex-row gap-2 flex-wrap bg-blue-950 hover:bg-yellow-400 text-slate-50 hover:text-slate-950 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Signing up...
              </>
            ) : (
              'Sign up'
            )}
          </Button>
        </div>
        <p>
          Already have an account?{' '}
          <span className="cursor-pointer text-blue-600" onClick={() => setAuthenticationType('signin')}>
            Sign in
          </span>
        </p>
      </form>
    </Form>
  );
};

export default Signup;
