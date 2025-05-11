import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useUserLogin } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { FaHome, FaRegEye, FaRegEyeSlash, FaSpinner } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address')
    .min(1, 'Email is required'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required'),
});

interface SigninProps {
  setAuthenticationType: (value: string) => void;
}

const initialValues = {
  email: '',
  password: '',
};
const Signin = ({ setAuthenticationType }: SigninProps) => {
  // const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoginUser, isLoading } = useUserLogin();
  const { userId, userType, setUserLoginData } = useStore(
    useShallow((state) => ({
      userId: state.userId,
      userType: state.userType,
      setUserLoginData: state.setUserLoginData,
    }))
  );

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    isLoginUser(values, {
      onSuccess: (data) => {
        handleZustandLoginData(data);
        form.reset();
      },
      onError: (error) => {
        console.log(error);
        throw error;
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleZustandLoginData = (data: any) => {
    setUserLoginData({
      userId: data.userId,
      email: data.user.email,
      displayName: `${data.firstName} ${data.lastName}`,
      userType: data.userType,
      photo: data.photo,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      if (userType === 'guest') {
        navigate('/guest');
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
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-slate-900">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" className="text-slate-950" {...field} />
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
        <div>
          <div className="w-full flex flex-row flex-wrap gap-2">
            <NavLink to="/">
              <Button
                type="button"
                className="bg-yellow-400 hover:bg-blue-950 text-slate-950 hover:text-slate-50 "
              >
                <FaHome className="text-center size-[1.25rem]" />
              </Button>
            </NavLink>
            <Button
              className="grow flex flex-row gap-2 flex-wrap bg-blue-950 hover:bg-yellow-400 text-slate-50 hover:text-slate-950"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </div>
        </div>
        <p>
          Don't have an account?{' '}
          <span className="cursor-pointer text-blue-600" onClick={() => setAuthenticationType('signup')}>
            Sign up
          </span>
        </p>
      </form>
    </Form>
  );
};

export default Signin;
