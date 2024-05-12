import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

// const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

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
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {};
  return (
    <section className="flex flex-col md:flex-row min-h-screen w-full items-center">
      <div
        className="hidden md:flex flex-col items-center justify-center w-1/2 h-screen"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30, 41, 59 , 0.8), rgba(2,6,23, 0.9)), url(https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/350508483_933305101248357_6402011176098709504_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7pkEP8ygDDsQ7kNvgFRw-Qx&_nc_ht=scontent.fmnl4-7.fna&oh=00_AYAg8QvMEWN5xmG__8plR04fgv7HUFkpbou_etr77usC2w&oe=6642F91E)',
        }}
      >
        <h1 className="text-3xl text-white font-bold">Welcome to</h1>
        <p className="text-xl text-white">Please login to enjoy the benefits of our service</p>
      </div>
      <div className="flex flex-col gap-4 items-center w-full h-screen justify-center bg-gradient-to-tr from-slate-50 to-slate-100">
        <Form {...form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem className="w-full md:w-2/6">
                  <FormLabel>Username</FormLabel>
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
                <FormItem className="w-full md:w-2/6">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <Button>Sign In</Button>
        </Form>
      </div>
    </section>
  );
};

export default Login;
