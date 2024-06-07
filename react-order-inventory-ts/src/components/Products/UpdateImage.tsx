import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { useUpdateDishImage } from '@/hooks/use/useDishes';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const UpdateImageSchema = z.object({
  dishImage: z
    .instanceof(File, { message: 'Image is required' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

interface UpdateImageProps {
  id: string;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateImage = ({ id, setOnOpen }: UpdateImageProps) => {
  const { editDishImage, isUpdating } = useUpdateDishImage();
  const form = useForm<z.infer<typeof UpdateImageSchema>>({
    resolver: zodResolver(UpdateImageSchema),
    defaultValues: {
      dishImage: undefined,
    },
  });

  const handleSubmit = (data: z.infer<typeof UpdateImageSchema>) => {
    editDishImage(
      { id, ...data },
      {
        onSuccess: () => {
          form.reset();
          setOnOpen((prev) => !prev);
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col flex-wrap gap-4">
        <FormField
          control={form.control}
          name="dishImage"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => {
            return (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel className="place-items-start">Image</FormLabel>
                <FormControl className="text-center bg-slate-800/50">
                  <Input
                    type="file"
                    placeholder="Image"
                    accept="image/*"
                    {...fieldProps}
                    onChange={(e) => onChange(e.target.files && e.target.files[0])}
                  />
                </FormControl>
                {value && (
                  <img src={URL.createObjectURL(value)} className="size-36 m-auto" alt="Product Image" />
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button className="bg-orange-500" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Image'}
        </Button>
      </form>
    </Form>
  );
};
export default UpdateImage;
