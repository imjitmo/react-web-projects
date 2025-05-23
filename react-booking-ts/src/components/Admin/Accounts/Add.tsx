/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Modal from '@/components/UiHooks/Modal';
import { useRegisterUser, useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';

import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const SignUpSchema = z
  .object({
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
    userType: z
      .string({
        required_error: 'User type is required',
      })
      .min(1, 'User type is required'),
    section: z.string({}).optional(),
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

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  userType: 'staff',
  section: '',
  password: '',
  repeatPassword: '',
};
const Add = () => {
  const [onOpen, setOnOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { isRegisterUser, isLoading } = useRegisterUser();
  const { userActionLogs } = useUserLogs();
  const [onError, setOnError] = useState<any>(null);
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const { userId, email, displayName, userType } = useStore(
    useShallow((state) => ({
      userId: state.userId,
      email: state.email,
      displayName: state.displayName,
      userType: state.userType,
    }))
  );
  const userLogData = {
    userId: userId ? userId : '',
    userEmail: email ? email : '',
    userName: displayName ? displayName : '',
    userType: userType ? userType : '',
  };

  const handleSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    isRegisterUser(
      {
        ...values,
      },
      {
        onSuccess: () => {
          userActionLogs(
            {
              action: `Added User ${values.firstName} ${values.lastName} as ${
                values.userType === 'staff' ? 'student' : 'admin'
              }`,
              ...userLogData,
            },
            {
              onSuccess: () => {
                form.reset();
                setOnOpen(false);
              },
              onError: (error) => {
                setOnError(error);
              },
            }
          );
        },
        onError: (error) => {
          console.log(error);
          setOnError(error);
        },
      }
    );
  };
  return (
    <>
      <Button
        variant="outline"
        className="bg-yellow-400 text-blue-950 hover:bg-blue-950 dark:bg-blue-950 hover:dark:bg-blue-800 hover:text-slate-50 dark:text-slate-50 rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]"
        onClick={() => setOnOpen((prev) => !prev)}
      >
        <IoMdAddCircleOutline className="size-6" /> Add a User
      </Button>
      <Modal header={'Add User'} onOpen={onOpen} setOnOpen={setOnOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center justify-between content-center-safe w-full">
              <div className="flex flex-row gap-2 w-full">
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
                        {/* <FormMessage /> */}
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>
                          Middle Name<span className="italic text-xs font-normal">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Middle Name" {...field} />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    );
                  }}
                />
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
                        {/* <FormMessage /> */}
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row justify-between text-sm w-full">
                {form.formState.errors.firstName && (
                  <p className="text-red-500">{form.formState.errors.firstName.message}</p>
                )}

                {form.formState.errors.lastName && (
                  <p className="text-red-500">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-row gap-2">
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
                        {/* <FormMessage /> */}
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>User Type</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            name={field.name}
                            onValueChange={field.onChange}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="User a Type" onBlur={field.onBlur} ref={field.ref} />
                            </SelectTrigger>
                            <SelectContent className="text-blue-950 dark:bg-slate-950 dark:text-slate-50">
                              <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                <SelectItem
                                  className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                                  value="staff"
                                >
                                  Student
                                </SelectItem>
                                {userType === 'admin' && (
                                  <SelectItem
                                    className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                                    value="admin"
                                  >
                                    Trainer
                                  </SelectItem>
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Section</FormLabel>
                        <FormControl>
                          <Input placeholder="Section" className="uppercase" {...field} />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row justify-between text-sm w-full">
                {form.formState.errors.email && (
                  <p className="text-red-500">{form.formState.errors.email.message}</p>
                )}
                {onError && <p className="text-red-500">{onError}</p>}
                {form.formState.errors.userType && (
                  <p className="text-red-500">{form.formState.errors.userType.message}</p>
                )}
              </div>
            </div>
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
            />

            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showRepeatPassword ? 'text' : 'password'}
                          placeholder="Repeat Password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-950"
                          onClick={() => setShowRepeatPassword((prev) => !prev)}
                        >
                          {showRepeatPassword ? (
                            <FaRegEye className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <FaRegEyeSlash className="h-4 w-4" aria-hidden="true" />
                          )}
                          <span className="sr-only">
                            {showRepeatPassword ? 'Hide password' : 'Show password'}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex flex-row gap-2 items-end justify-end">
              <Button
                className="flex flex-row gap-2 flex-wrap bg-blue-950 hover:bg-yellow-400 text-slate-50 hover:text-slate-950 cursor-pointer w-32"
                disabled={isLoading}
              >
                {isLoading ? <Loading size={20} /> : 'Add User'}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
