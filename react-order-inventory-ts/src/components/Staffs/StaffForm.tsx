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

import { staffType } from '@/hooks/data/selectValues';
import { useForm } from 'react-hook-form';

import { useRegisterStaff } from '@/hooks/use/useStaff';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaSpinner } from 'react-icons/fa';
import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const StaffSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
    })
    .min(1, 'First Name is required'),
  lastName: z
    .string({
      required_error: 'Last Name is required',
    })
    .min(1, 'Last Name is required'),
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
    .min(8, 'Must be at least 8 characters')
    .max(32, 'Must be at most 24 characters')
    .regex(passwordValidation, {
      message: 'Must contain at least one uppercase, one lowercase, one number and one special character',
    }),
  userType: z.string({ required_error: 'User Type is required' }).min(1, 'User Type is required'),
});

const StaffForm = () => {
  const form = useForm<z.infer<typeof StaffSchema>>({
    resolver: zodResolver(StaffSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const { addUser, isCreating } = useRegisterStaff();
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );

  const handleStaffRegistration = async (values: z.infer<typeof StaffSchema>) => {
    addUser(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleStaffRegistration)} className="flex flex-col gap-4">
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
                <FormMessage />
              </FormItem>
            );
          }}
        />
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
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
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
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Type</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={field.onChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a User Type" onBlur={field.onBlur} ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 text-slate-50">
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      {/* {userType === 'super' && (
                        <>
                          <SelectItem value="super">Super Admin</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </>
                      )} */}
                      {staffType
                        .filter((type) => (userType === 'super' ? type : type.value !== 'admin'))
                        .map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row flex-wrap gap-2">
          <Button
            className="flex flex-row gap-2 flex-wrap bg-orange-500 grow"
            type="submit"
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <FaSpinner className="animate-spin" />
                Creating...
              </>
            ) : (
              'Create New Staff'
            )}
          </Button>
          <Button className="bg-red-500" type="button" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default StaffForm;
