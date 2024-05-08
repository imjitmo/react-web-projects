import { login, signUpUser } from '@/hooks/useUsersData';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const RegisterSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Must be a valid email',
    }),
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(8, 'Must be at least 8 characters')
    .max(14, 'Must be at most 14 characters'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Must be at least 8 characters')
    .max(24, 'Must be at most 24 characters')
    .regex(passwordValidation, {
      message: 'Must contain at least one uppercase, one lowercase, one number and one special character',
    }),
});

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

const LoginRegister = () => {
  const [userInteraction, setUserInteraction] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const userSchema = userInteraction ? RegisterSchema : LoginSchema;
  const defaultValues = userInteraction
    ? {
        email: '',
        username: '',
        password: '',
      }
    : {
        username: '',
        password: '',
      };

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      setIsLoading(true);
      let res;
      if (userInteraction) {
        res = await signUpUser(values);
      } else {
        res = await login(values);
      }
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-2xl">Connect</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome!</DialogTitle>
            <DialogDescription>
              {userInteraction ? 'Create' : 'Login to'} your account to enjoy our cool notes app.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
              {userInteraction && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                ></FormField>
              )}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
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
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              <Button disabled={isLoading}>
                {isLoading ? (
                  <ReloadIcon className="animate-spin size-6" />
                ) : userInteraction ? (
                  'Sign Up'
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>
          <DialogDescription>
            {userInteraction ? 'Already' : "Don't"} have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer italic"
              onClick={() => {
                setUserInteraction((prev) => !prev);
                form.reset();
              }}
            >
              {userInteraction ? 'Sign in' : 'Sign up'}
            </span>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginRegister;
