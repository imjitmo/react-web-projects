import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useStaffLogin } from '@/hooks/use/useStaff';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
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

// interface SigninProps {
//   setAuthenticationType: (value: string) => void;
// }

const initialValues = {
  email: '',
  password: '',
};
// const Signin = ({ setAuthenticationType }: SigninProps) => {
const Signin = () => {
  const { loginStaff, isLoading } = useStaffLogin();
  const { userId, setUserLoginData } = useStore(
    useShallow((state) => ({
      userId: state.userId,
      setUserLoginData: state.setUserLoginData,
    }))
  );
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    loginStaff(values, {
      onSuccess: (data) => {
        handleZustandLoginData(data);
        form.reset();
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleZustandLoginData = (data: any) => {
    setUserLoginData({
      userId: data.user.id,
      email: data.user.email,
      displayName: data.user.user_metadata.displayName,
      userType: data.user.user_metadata.userType,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      navigate('/dashboard');
    }
  }, [userId, navigate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-slate-900">Username</FormLabel>
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
                  <Input type="password" placeholder="Password" className="text-slate-950" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
        <div>
          <div className="w-full flex flex-row flex-wrap gap-2">
            <NavLink to="/">
              <Button type="button" className="bg-green-500">
                <IoHomeOutline className="text-center text-slate-50 size-[1.25rem]" />
              </Button>
            </NavLink>
            <Button className="grow flex flex-row gap-2 flex-wrap" disabled={isLoading}>
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
        {/* <p>
          Don't have an account?{' '}
          <span className="cursor-pointer text-blue-600" onClick={() => setAuthenticationType('signup')}>
            Sign up
          </span>
        </p> */}
      </form>
    </Form>
  );
};

export default Signin;
