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
import Tiptools from '@/components/UiHooks/Tooltip';
import { Municipal } from '@/hooks/models/Municipal';
import { Provincial } from '@/hooks/models/Provincial';
import { Regional } from '@/hooks/models/Regional';
import { useUpdateGuestInformation } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';
const setupProfileSchema = z.object({
  contactNumber: z
    .string({
      required_error: 'Contact Number is required',
    })
    .min(1, 'Contact Number is required')
    .refine(
      (value) => /^(09|\+639|639)[0-9]{8,9}$/.test(value),
      'PH number is consist of 11 digits starting with (09) or +639'
    ),
  homeAddress: z
    .string({
      required_error: 'Home Address is required',
    })
    .min(1, 'Home Address is required'),
  streetName: z
    .string({
      required_error: 'Street Name is required',
    })
    .min(1, 'Street Name is required'),
  brgyAddress: z
    .string({
      required_error: 'Barangay Address is required',
    })
    .min(1, 'Barangay Address is required'),
  municipalAddress: z
    .string({
      required_error: 'Municipal Address is required',
    })
    .min(1, 'Municipal Address is required'),
  provincialAddress: z
    .string({
      required_error: 'Provincial Address is required',
    })
    .min(1, 'Provincial Address is required'),
  regionalAddress: z
    .string({
      required_error: 'Regional Address is required',
    })
    .min(1, 'Regional Address is required'),
});

const initialValues = {
  contactNumber: '',
  homeAddress: '',
  streetName: '',
  brgyAddress: '',
  municipalAddress: '',
  provincialAddress: '',
  regionalAddress: '',
};
const Setup = () => {
  const navigate = useNavigate();
  const { userId } = useStore(useShallow((state) => ({ userId: state.userId })));
  const { isUpdateGuestInformation, isUpdating } = useUpdateGuestInformation();
  const [onOpen, setOpen] = useState(false);
  const [regionalKey, setRegionalKey] = useState('');
  const [provincialKey, setProvincialKey] = useState('');
  const form = useForm<z.infer<typeof setupProfileSchema>>({
    resolver: zodResolver(setupProfileSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const handleRegionalChange = (value: string) => {
    const regional = Regional.find((regional) => regional.long === value);
    if (regional) {
      setRegionalKey(regional.key);
    }
  };

  const handleProvincialChange = (value: string) => {
    const provincial = Provincial.find((provincial) => provincial.name === value);
    if (provincial) {
      setProvincialKey(provincial.key);
      console.log(provincial);
    }
  };

  const handleSubmit = (value: z.infer<typeof setupProfileSchema>) => {
    isUpdateGuestInformation(
      {
        ...value,
        userId: userId ? userId : '',
      },
      {
        onSuccess: () => {
          setOpen(false);
          navigate('/room');
        },
      }
    );
  };
  return (
    <div>
      <Tiptools title="Setup Profile" titleClassName="text-slate-950 dark:text-slate-50">
        <Button
          className="bg-blue-950 text-slate-50 hover:bg-yellow-400 hover:text-blue-950"
          onClick={() => setOpen((prev) => !prev)}
        >
          Setup Profile
        </Button>
      </Tiptools>
      <Modal header="Setup Profile" onOpen={onOpen} setOnOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex flex-col gap-2 justify-between content-center-safe w-ful">
              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="regionalAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            name={field.name}
                            onValueChange={(e) => {
                              field.onChange(e);
                              handleRegionalChange(e);
                            }}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Select a region"
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                            </SelectTrigger>
                            <SelectContent className="text-blue-950 dark:bg-slate-950 dark:text-slate-50">
                              <SelectGroup>
                                <SelectLabel>Region</SelectLabel>
                                {Regional.map((item) => (
                                  <SelectItem
                                    className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                                    key={item.key}
                                    value={item.long}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="provincialAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            name={field.name}
                            onValueChange={(e) => {
                              field.onChange(e);
                              handleProvincialChange(e);
                            }}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Select a province"
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                            </SelectTrigger>
                            <SelectContent className="text-blue-950 dark:bg-slate-950 dark:text-slate-50">
                              <SelectGroup>
                                <SelectLabel>Province</SelectLabel>
                                {Provincial.filter((provincial) => provincial.region === regionalKey).map(
                                  (provincial) => (
                                    <SelectItem
                                      className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                                      key={provincial.key}
                                      value={provincial.name}
                                    >
                                      {provincial.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="municipalAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>City/Municipality</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            name={field.name}
                            onValueChange={field.onChange}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Select a City/Municipality"
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                            </SelectTrigger>
                            <SelectContent className="text-blue-950 dark:bg-slate-950 dark:text-slate-50">
                              <SelectGroup>
                                <SelectLabel>City/Municipality</SelectLabel>
                                {Municipal.filter((municipal) => municipal.province === provincialKey).map(
                                  (provincial) => (
                                    <SelectItem
                                      className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                                      key={provincial.name}
                                      value={provincial.name}
                                    >
                                      {provincial.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row justify-between text-sm w-full">
                {form.formState.errors.homeAddress && (
                  <p className="text-red-500">{form.formState.errors.homeAddress.message}</p>
                )}
                {form.formState.errors.streetName && (
                  <p className="text-red-500">{form.formState.errors.streetName.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-between content-center-safe w-ful">
              <div className="flex flex-row gap-2">
                <FormField
                  control={form.control}
                  name="homeAddress"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Block No./House No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Block No./House No." {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="streetName"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Street Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Street Name" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="brgyAddress"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Barangay</FormLabel>
                        <FormControl>
                          <Input placeholder="Barangay" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row justify-between text-sm w-full">
                {form.formState.errors.homeAddress && (
                  <p className="text-red-500">{form.formState.errors.homeAddress.message}</p>
                )}
                {form.formState.errors.streetName && (
                  <p className="text-red-500">{form.formState.errors.streetName.message}</p>
                )}
              </div>
              <div className="w-full flex justify-end">
                <Button
                  className="bg-blue-950 text-slate-50 hover:bg-yellow-400 hover:text-blue-950"
                  disabled={isUpdating}
                >
                  {isUpdating ? <Loading size={20} /> : 'Update Profile'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};
export default Setup;
