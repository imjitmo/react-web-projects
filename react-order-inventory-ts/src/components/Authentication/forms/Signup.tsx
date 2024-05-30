// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';

// import * as z from 'zod';

// const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

// const SignUpSchema = z.object({
//   email: z
//     .string({
//       required_error: 'Email is required',
//     })
//     .email({
//       message: 'Must be a valid email',
//     }),
//   username: z
//     .string({
//       required_error: 'Username is required',
//     })
//     .min(8, 'Must be at least 8 characters')
//     .max(14, 'Must be at most 14 characters'),
//   password: z
//     .string({
//       required_error: 'Password is required',
//     })
//     .min(8, 'Must be at least 8 characters')
//     .max(24, 'Must be at most 24 characters')
//     .regex(passwordValidation, {
//       message: 'Must contain at least one uppercase, one lowercase, one number and one special character',
//     }),
// });

// interface SignupProps {
//   setAuthenticationType: (value: string) => void;
// }

// const initialValues = {
//   email: '',
//   username: '',
//   password: '',
// };
// const Signup = ({ setAuthenticationType }: SignupProps) => {
//   // const { isLoading, form } = useZod(initialValues, SignUpSchema);
//   // const [isLoading, setIsLoading] = useState(false);

//   // const form = useForm<z.infer<typeof SignUpSchema>>({
//   //   resolver: zodResolver(SignUpSchema),
//   //   defaultValues: initialValues,
//   // });

//   const handleSubmit = async (values: z.infer<typeof SignUpSchema>) => {
//     console.log(values);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => {
//             return (
//               <FormItem className="w-full">
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input placeholder="email" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             );
//           }}
//         ></FormField>

//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => {
//             return (
//               <FormItem className="w-full">
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Username" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             );
//           }}
//         ></FormField>

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => {
//             return (
//               <FormItem className="w-full">
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="Password" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             );
//           }}
//         ></FormField>

//         <div>
//           <Button className="w-full" disabled={isLoading}>
//             Sign Up
//           </Button>
//         </div>
//         <p>
//           Already have an account?{' '}
//           <span className="cursor-pointer text-blue-600" onClick={() => setAuthenticationType('signin')}>
//             Sign in
//           </span>
//         </p>
//       </form>
//     </Form>
//   );
// };

// export default Signup;
