import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CustomSelect } from '@/components/ui/basic-select';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/services/auth';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1, 'Author name is required.'),
  email: z
    .string()
    .email('Invalid email address provided.')
    .min(1, 'Author name is required.'),
  password: z
    .string()
    .min(6, 'Passwords needs to be six characters and above.'),
  confirmPassword: z
    .string()
    .min(6, 'Passwords needs to be six characters and above.'),
  role: z.enum(['admin', 'editor', 'author', 'standard'], {
    required_error: 'Select role',
  }),
});

export default function AuthorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      role: 'author',
    },
    resolver: zodResolver(formSchema),
  });

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: (details: z.infer<typeof formSchema>) => createUser(details),
    onError: error => {
      toast.error(error.message, { duration: 5000 });
    },
    onSuccess: () => {
      toast.success('User created successfully!');
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      toast.error(`Passwords don't match!😥`);
      return;
    }
    create(values);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create user</CardTitle>
        <CardDescription>
          Create users who will be responsible for creating blogs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Doe"
                      {...field}
                      disabled={isCreating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jsmith@example.com"
                      {...field}
                      disabled={isCreating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      disabled={isCreating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      disabled={isCreating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <CustomSelect
                      defaultValue={field.value}
                      onChange={field.onChange}
                      placeholder="Select role"
                      className="w-full"
                      options={[
                        { value: 'admin', label: 'Admin' },
                        { value: 'editor', label: 'Editor' },
                        { value: 'author', label: 'Author' },
                      ]}
                      disabled={isCreating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="actions">
              <Button type="submit" size="sm" disabled={isCreating}>
                Submit
              </Button>
              <Button
                type="reset"
                size="sm"
                variant="outline"
                disabled={isCreating}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
