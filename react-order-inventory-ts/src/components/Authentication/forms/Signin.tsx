import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const LoginSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(1, 'Username is required'),
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
  username: '',
  password: '',
};
// const Signin = ({ setAuthenticationType }: SigninProps) => {
const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initialValues,
  });
  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-slate-900">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
        <div>
          <Button className="w-full" disabled={isLoading}>
            Sign In
          </Button>
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
