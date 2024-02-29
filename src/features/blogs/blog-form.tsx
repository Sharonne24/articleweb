import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { getCategories } from '@/services/categories-api';
import { CustomSelect } from '@/components/ui/basic-select';
import { titleCase } from '@/lib/utils';
import { toast } from 'sonner';
import ImageUploader from '@/components/ui/image-uploader';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().min(20, 'Title is too short.'),
  imageUrl: z.string().min(1, 'Blog image is required.'),
  content: z.string().min(100, 'Content is too short.'),
  category: z.string().min(1, 'Category is required.'),
});

type FormType = z.infer<typeof formSchema>;

export default function BlogForm() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const formattedCategories = categories?.map(category => ({
    value: category.id.toString(),
    label: titleCase(category.category),
  }));

  if (error) {
    toast.error('Error while retrieving created categories.', {
      duration: 5000,
    });
  }

  const form = useForm<FormType>({
    defaultValues: {
      title: '',
      imageUrl: '',
      category: '',
      content: '',
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create a blog</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title for your post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CustomSelect
                      placeholder="Select category"
                      options={formattedCategories || []}
                      defaultValue={field.value}
                      onChange={field.onChange}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog poster</FormLabel>
                  <FormControl>
                    <ImageUploader />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-max">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="h-80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="actions">
              <Button size="sm">Submit</Button>
              <Button type="button" size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
